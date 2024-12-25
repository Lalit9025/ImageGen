import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!); // Replace with your MongoDB URI

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Validate the request body
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    await client.connect();
    const db = client.db();
    const usersCollection = db.collection('users');

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Store the user in the database
    const newUser = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'User created successfully', userId: newUser.insertedId }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  } finally {
    await client.close();
  }
}
