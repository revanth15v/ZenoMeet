"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PhoneOff, Clock, FileText, Home, Calendar, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

import "@stream-io/video-react-sdk/dist/css/styles.css"

export const CallEnded = () => {
  const [summaryProgress, setSummaryProgress] = useState(0)
  const [showSummaryReady, setShowSummaryReady] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setSummaryProgress((prev) => {
        if (prev >= 100) {
          setShowSummaryReady(true)
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Icon and Status */}
            <div className="flex flex-col items-center text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <PhoneOff className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-1 -right-1"
                >
                  <Badge variant="destructive" className="text-xs px-2 py-1">
                    Ended
                  </Badge>
                </motion.div>
              </motion.div>

              {/* Main Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Call Ended</h1>
                <p className="text-slate-600 dark:text-slate-400">Thank you for joining the meeting</p>
              </motion.div>

              {/* Summary Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full space-y-3"
              >
                <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>{showSummaryReady ? "Summary ready!" : "Generating summary..."}</span>
                </div>

                <AnimatePresence mode="wait">
                  {!showSummaryReady ? (
                    <motion.div
                      key="progress"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-2"
                    >
                      <Progress value={summaryProgress} className="h-2" />
                      <p className="text-xs text-slate-500 dark:text-slate-500">{summaryProgress}% complete</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="ready"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Summary is ready to view</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full space-y-3"
              >
                <div className="grid grid-cols-1 gap-3">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/dashboard/meetings" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Back to Meetings
                    </Link>
                  </Button>

                  {showSummaryReady && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ delay: 0.2 }}
                    >
                      <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
                        <Link href="/dashboard/summaries" className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          View Summary
                        </Link>
                      </Button>
                    </motion.div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </Button>

                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/contacts" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Contacts
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xs text-slate-500 dark:text-slate-500 text-center"
              >
                Meeting data is automatically saved to your account
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
