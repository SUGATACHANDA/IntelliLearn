"use client"
import MuxPlayer from "@mux/mux-player-react"
import React, { use, useState } from "react";
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Loader2, LockKeyhole } from "lucide-react"
import { cn } from "../../../../../../../lib/utils";
import { useConfettiStore } from "../../../../../../../hooks/use-confetti"

interface VideoPlayerProps {
    playbackId: string;
    title: string;
    courseId: string;
    chapterId: string;
    isLocked: boolean;
    completeOnEnd: boolean
    nextChapterId?: string;
}

const VideoPlayer = ({ playbackId, title, courseId, chapterId, isLocked, completeOnEnd, nextChapterId }: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false)
    const router = useRouter()
    const confetti = useConfettiStore()
    const onEnd = async () => {
        if (completeOnEnd) {
            try {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isCompleted: true,
                })
                if (!nextChapterId) {
                    confetti.onOpen()
                    toast.success("Course Completed Successfully")
                }


                if (nextChapterId) {
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
                    toast.success("Progress Updated")
                    router.refresh()
                }
            } catch (error) {
                toast.error("Something went wrong")
            } finally {
                router.refresh()
            }
        }
    }
    return (
        <div className="relative aspect-video">
            {!isReady && !isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Loader2 className="h-10 w-10 animate-spin text-secondary" />
                </div>
            )}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                    <LockKeyhole className="h-10 w-10" />
                    <p className="text-sm">
                        This Chapter is Locked
                    </p>
                </div>
            )}
            {!isLocked && (
                <MuxPlayer
                    title={title}
                    className={cn(
                        !isReady && "hidden",
                    )}
                    onCanPlay={() => setIsReady(true)}
                    onEnded={onEnd}
                    playbackId={playbackId}
                />
            )}
        </div>
    )
}

export default VideoPlayer;