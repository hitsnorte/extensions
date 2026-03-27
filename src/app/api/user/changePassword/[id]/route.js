import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export async function PATCH(request, { params }) {
    const { id } = params; // No need for `await` directly here
    const { oldPassword, newPassword } = await request.json(); // Extract data from the request body

    if (!oldPassword || !newPassword) {
        return NextResponse.json(
            { message: "Missing old password or new password." },
            { status: 400 }
        );
    }

    try {
        // Verify if the user exists
        const user = await prisma.users.findUnique({
            where: { userID: parseInt(id) },
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found." },
                { status: 404 }
            );
        }

        // Check if the old password is correct
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            return NextResponse.json(
                { message: "Incorrect old password." },
                { status: 400 }
            );
        }

        // Update the password with the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await prisma.users.update({
            where: { userID: parseInt(id) },
            data: { password: hashedNewPassword },
        });

        console.log(updatedUser);

        return NextResponse.json(
            { message: "Password updated successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json(
            { message: "An error occurred." },
            { status: 500 }
        );
    }
}