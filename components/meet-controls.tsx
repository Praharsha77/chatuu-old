"use client"

import { CallControls } from "@stream-io/video-react-sdk"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MeetControlsProps {
  meetingId: string
  call: any // Pass the call object
}

export default function MeetControls({ meetingId, call }: MeetControlsProps) {
  const router = useRouter()
  const [shareLink, setShareLink] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && meetingId) {
      setShareLink(`${window.location.origin}/meet/${meetingId}`)
    }
  }, [meetingId])

  const handleLeaveCall = () => {
    router.push("/")
  }

  const handleCopyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-darkBackground p-4 flex items-center justify-between z-30">
      {" "}
      {/* Increased z-index to z-30 */}
      {/* Left-aligned placeholder or empty div if nothing else is needed on the left */}
      <div className="flex-1"></div>
      {/* CallControls (mic, video, screen share, end call) - Centered */}
      <div className="flex justify-center space-x-2">
        <CallControls onLeave={handleLeaveCall} />
      </div>
      {/* Info/Share Link Dialog Trigger - Right Corner */}
      <div className="flex justify-end flex-1">
        <Dialog>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-primary" // Background changes to primary on hover
                    aria-label="Meeting details and share link"
                  >
                    <Info className="h-6 w-6 text-white" /> {/* Explicitly set icon color to white */}
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy link to add collaborators</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DialogContent className="sm:max-w-[425px] bg-darkBackground text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Meeting Details</DialogTitle>
              <DialogDescription className="text-gray-400">
                Share this link with others to invite them to the meeting.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="share-link-dialog" className="text-white">
                  Meeting Link
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="share-link-dialog"
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 bg-darkBackground/60 text-white border-darkBackground/60 focus:ring-primary focus:border-primary" // Using primary for focus
                    aria-label="Meeting share link"
                  />
                  <Button
                    onClick={handleCopyLink}
                    className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-md" // Using primary for button
                    aria-label="Copy meeting link"
                  >
                    {copied ? "Copied!" : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}