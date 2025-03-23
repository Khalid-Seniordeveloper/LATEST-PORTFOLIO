"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

interface MobileMenuProps {
  routes: {
    name: string
    path: string
  }[]
}

export function MobileMenu({ routes }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      // Add blur class to body content but not to the menu
      document.body.classList.add("body-blurred")
    } else {
      document.body.style.overflow = "unset"
      // Remove blur class from body
      document.body.classList.remove("body-blurred")
    }
    return () => {
      document.body.style.overflow = "unset"
      document.body.classList.remove("body-blurred")
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <div className="md:hidden mobile-menu-container w-[100%] h-[100%] z-[9999]">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full  dark:bg-slate-200/50 text-white dark:text-slate-900 hover:bg-slate-700/70 dark:hover:bg-slate-300/70"
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with stronger blur */}
            <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
  className="fixed inset-0 bg-transparent backdrop-blur-lg z-[9998]" // Changed to purple
  onClick={toggleMenu}
/>

            {/* Menu - with highest z-index and no blur */}
            <motion.div
  className="fixed top-0 right-0 bottom-0 w-4/5 h-[700px] max-w-sm z-[9999] p-6 shadow-xl"
  style={{ backgroundColor: '#3a1c71' }} // Dark purple background color
  variants={menuVariants}
  initial="closed"
  animate="open"
  exit="closed"
>
              <div className="flex justify-end mb-8">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-full bg-slate-800/50 dark:bg-slate-700/50 text-white hover:bg-slate-700/70 dark:hover:bg-slate-600/70"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {routes.map((route, index) => (
                  <motion.div key={route.path} variants={itemVariants} custom={index} whileHover={{ x: 10 }}>
                    <Link
                      href={route.path}
                      className={`text-xl font-medium py-3 px-4 rounded-lg flex items-center ${
                        pathname === route.path
                          ? "text-white bg-purple-500/20 border-purple-500"
                          : "text-gray-200 hover:text-white hover:bg-purple-500/10"
                      }`}
                    >
                      <motion.span initial={{ scale: 1 }} whileHover={{ scale: 1.05 }} className="relative">
                        {route.name}
                        {pathname === route.path && (
                          <motion.span
                            layoutId="activeRoute"
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400"
                          />
                        )}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

