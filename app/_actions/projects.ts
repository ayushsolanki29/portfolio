import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";

export const getProjects = async (page = 1, limit = 6) => {
  connectToDatabase();
  // Calculate the number of documents to skip
  const skip = (page - 1) * limit;

  // Use MongoDB aggregation to join the projects with their tech stacks
  const projects = await Project.aggregate([
    {
      $lookup: {
        from: "techstacks", // The name of the tech stacks collection
        localField: "techStacks", // Field in the Project collection
        foreignField: "_id", // Field in the TechStack collection
        as: "techStacks", // Output array containing matched tech stacks
      },
    },
    {
      $sort: { createdAt: 1 }, // Sort projects by createdAt in ascending order
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
          name: 1,
          image: 1,
        },
      },
    },
  ]);

  return projects;
};
export const getProjectsBySlug = async (slug: string) => {
  await connectToDatabase(); // Ensure you connect to the database

  const project = await Project.aggregate([
    {
      $match: { slug }, // Match the project with the given slug
    },
    {
      $lookup: {
        from: "techstacks", // The name of the tech stacks collection
        localField: "techStacks", // Field in the Project collection
        foreignField: "_id", // Field in the TechStack collection
        as: "techStacks", // Output array containing matched tech stacks
      },
    },
    {
      $lookup: {
        from: "images", // The name of the images collection
        localField: "_id", // Field in the Project collection
        foreignField: "projectId", // Field in the Image collection
        as: "images", // Output array containing matched images
      },
    },
    {
      $project: {
        title: 1,
        githubUrl: 1,
        liveUrl: 1,
        description: 1,
        content: 1,
        slug: 1,
        thumbnail: 1,
        techStacks: {
          name: 1,
          image: 1,
          role: 1,
        },
        images: {
          imageUrl: 1, // Include image URLs in the result
        },
      },
    },
  ]);

  // Since `aggregate` returns an array, get the first element (or null if not found)
  if (project.length > 0) {
    // Convert `_id` and other complex types to simple values
    const projectData = project[0];

    // Convert the project _id to a string
    projectData._id = projectData._id.toString();

    // Convert each techStack _id to string if needed
    if (projectData.techStacks) {
      projectData.techStacks = projectData.techStacks.map((stack: any) => {
        if (stack._id) stack._id = stack._id.toString();
        return stack;
      });
    }

    // Convert each image _id to string if needed
    if (projectData.images) {
      projectData.images = projectData.images.map((image: any) => {
        if (image._id) image._id = image._id.toString();
        return image;
      });
    }

    return projectData;
  }

  return null;
};
