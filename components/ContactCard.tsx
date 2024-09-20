import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

export default function ContactInfoCard() {
  return (
    <Card className="flex flex-col md:flex-row mx-auto bg-transparent shadow-lg rounded-lg overflow-hidden max-w-4xl">
      {/* Image Section */}
      <div className="size-48 p-10">
        <Avatar className="w-full h-full">
          <AvatarImage
            src="https://via.placeholder.com/300x400"
            alt="Profile Picture"
            className="object-cover w-full h-full"
          />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      </div>

      {/* Text Content Section */}
      <div className="flex flex-col justify-center p-6 md:w-1/2">
        <CardHeader className="text-left">
          <CardTitle className="text-3xl font-semibold text-gray-900 dark:text-white">
            Ayush Solanki
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-400">Backend Developer</p>
        </CardHeader>

        <CardContent className="mt-4 space-y-4">
          <Button
            variant="ghost"
            className="text-gray-900 dark:text-gray-200 flex items-center justify-start"
          >
            <Mail className="w-5 h-5 mr-2" /> ayushsolanki2901@gmail.com
          </Button>
          <Button
            variant="ghost"
            className="text-gray-900 dark:text-gray-200 flex items-center justify-start"
          >
            <Phone className="w-5 h-5 mr-2" /> +91 12345 67890
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}
