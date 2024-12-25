import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const client = new MongoClient(process.env.MONGODB_URI!); // Replace with your MongoDB URI

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validate the request body
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    await client.connect();
    const db = client.db();
    const usersCollection = db.collection('users');

    // Find the user by email
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'Incorrect password' }, { status: 400 });
    }

    // Successfully authenticated
    return NextResponse.json({ message: 'Login successful', userId: user._id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  } finally {
    await client.close();
  }
}
