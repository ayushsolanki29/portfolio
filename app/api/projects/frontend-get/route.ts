// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Project from '@/models/Project';

export async function GET(request: Request) {
  // Parse query parameters for pagination
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '6', 10);

  // Validate pagination parameters
  if (page < 1 || limit < 1) {
    return NextResponse.json(
      { success: false, message: 'Invalid pagination parameters.' },
      { status: 400 }
    );
  }

  await connectToDatabase();

  const skip = (page - 1) * limit;

  try {
    // Use MongoDB aggregation to join projects with their tech stacks
    const projects = await Project.aggregate([
      {
        $lookup: {
          from: 'techstacks', // The name of the tech stacks collection
          localField: 'techStacks', // Field in the Project collection
          foreignField: '_id', // Field in the TechStack collection
          as: 'techStacks', // Output array containing matched tech stacks
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort projects by createdAt in descending order
      },
      {
        $skip: skip, // Skip documents for pagination
      },
      {
        $limit: limit, // Limit the number of documents to fetch
      },
      {
        $project: {
          title: 1,
          description: 1,
          slug: 1,
          thumbnail: 1,
          techStacks: {
            $map: {
              input: '$techStacks',
              as: 'techStack',
              in: {
                name: '$$techStack.name',
                image: '$$techStack.image',
              },
            },
          },
        },
      },
    ]);

    // Respond with the fetched projects
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch projects.' },
      { status: 500 }
    );
  }
}
