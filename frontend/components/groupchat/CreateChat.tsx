'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Input } from '../ui/input'
import { CustomUser } from '@/app/api/auth/[...nextauth]/options'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { CHAT_GROUP_URL } from '@/lib/apiEndPoints'
import { clearCache } from '@/actions/common'

// ✅ Validation Schema
const ValidationSchema = z.object({
    title: z.string().min(4, { message: "Chat title must be at least 4 characters long" }).max(191, { message: "Chat title must be less than 191 characters" }),
    passcode: z.string().min(4, { message: "Passcode must be at least 4 characters long" }).max(25, { message: "Passcode must be less than 25 characters long" }),
});

type ChatForm = z.infer<typeof ValidationSchema>;

const CreateChat = ({ user }: { user: CustomUser }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ChatForm>({
        resolver: zodResolver(ValidationSchema)
    });

    // ✅ Submit Handler
    const onSubmit = async (data: ChatForm) => {
        try {
            setLoading(true);

            // ✅ Send API Request
            const response=await axios.post(CHAT_GROUP_URL, {
                title: data.title,
                passcode: data.passcode,
                user_id: user.id  // Assuming `user` object contains `id`
            },{
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })

            if(response.data){
                clearCache("dashboard")
            }
            console.log('response from backend',response)
            toast.success("Chat group created successfully!");

            // ✅ Reset form & close modal
            reset(); // Clear form fields
            setOpen(false);
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "API request failed");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Group</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create your new group chat</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Chat Title */}
                    <div className='mt-4'>
                        <Input placeholder='Enter the chat title' {...register("title")} />
                        {errors?.title && <span className='text-red-500'>{errors.title.message}</span>}
                    </div>

                    {/* Passcode */}
                    <div className='mt-4'>
                        <Input placeholder='Enter the chat passcode' {...register("passcode")} />
                        {errors?.passcode && <span className='text-red-500'>{errors.passcode.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <div className='mt-4'>
                        <Button type="submit" className='w-full' disabled={loading}>
                            {loading ? "Processing..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateChat;
