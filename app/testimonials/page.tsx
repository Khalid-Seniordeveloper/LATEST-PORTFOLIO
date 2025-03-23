"use client"

import { Anton, Poppins } from "next/font/google"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, Quote, Sun, Moon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { MobileMenu } from "@/components/mobile-menu"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
})

export default function TestimonialsPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Navigation routes
  const routes = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },

    { name: "Projects", path: "/#projects" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/#contact" },
  ]

  // Parallax effect for stars
  const starsY = useTransform(scrollYProgress, [0, 1], [0, 300])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Make canvas taller for parallax
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Star properties
    interface Star {
      x: number
      y: number
      radius: number
      opacity: number
      speed: number
      direction: { x: number; y: number }
    }

    const stars: Star[] = []
    const STAR_COUNT = 200 // Reduced star count

    // Create stars
    for (let i = 0; i < STAR_COUNT; i++) {
      const baseRadius = Math.random() * 1.2 // Smaller radius
      const baseOpacity = Math.random() * 0.5 + 0.2 // Lower opacity
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: baseRadius,
        opacity: baseOpacity,
        speed: Math.random() * 0.03, // Slower speed
        direction: {
          x: (Math.random() - 0.5) * 0.05, // Reduced movement
          y: Math.random() * 0.03,
        },
      })
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        // Move stars
        star.x += star.direction.x
        star.y += star.direction.y

        // Reset stars that go off screen
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        } else if (star.y < 0) {
          star.y = canvas.height
          star.x = Math.random() * canvas.width
        }

        if (star.x > canvas.width) {
          star.x = 0
          star.y = Math.random() * canvas.height
        } else if (star.x < 0) {
          star.x = canvas.width
          star.y = Math.random() * canvas.height
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  // Theme toggle handler
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Working with this developer was an absolute pleasure. They delivered our e-commerce platform ahead of schedule and exceeded all our expectations. The attention to detail and technical expertise were impressive.",
    },
    {
      name: "Michael Chen",
      role: "Founder, DesignHub",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The dashboard application developed for our team has transformed how we analyze data. The UI is intuitive, the performance is excellent, and the developer was responsive throughout the entire process.",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, GrowthLabs",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Our website redesign project was handled with incredible skill. The developer understood our brand vision and translated it into a beautiful, functional site that has significantly increased our conversion rates.",
    },
    {
      name: "David Wilson",
      role: "CTO, InnovateTech",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The API development work was exceptional. Clean code, well-documented, and perfectly integrated with our existing systems. I highly recommend their services for any technical project.",
    },
    {
      name: "Jennifer Lee",
      role: "E-commerce Manager, StyleShop",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Our online store's performance improved dramatically after the optimization work. Page load times decreased by 60%, and our conversion rate has nearly doubled. Extremely satisfied with the results.",
    },
    {
      name: "Robert Garcia",
      role: "Product Manager, SaaS Solutions",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The custom dashboard built for our SaaS product has received overwhelmingly positive feedback from our clients. The intuitive design and powerful features have set us apart from competitors.",
    },
  ]

  // Force animations to play on every visit
  useEffect(() => {
    // Reset any animation states
    const animatedElements = document.querySelectorAll(".framer-motion-animated")
    animatedElements.forEach((el) => {
      el.classList.remove("framer-motion-animated")
      el.classList.add("framer-motion-animated")
    })
  }, [])

  return (
    <main
      ref={containerRef}
      className="font-poppins bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 dark:bg-gradient-to-b dark:from-slate-100 dark:via-indigo-50 dark:to-slate-100 text-white dark:text-slate-900 relative transition-colors duration-500 min-h-screen"
    >
      {/* Stars Canvas */}
      <motion.div style={{ y: starsY }} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full" />
      </motion.div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 py-6 bg-slate-950/80 dark:bg-white/80 backdrop-blur-md transition-colors duration-500 framer-motion-animated"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="relative w-10 h-10 mr-2 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-purple-600 dark:bg-purple-700 rounded-full framer-motion-animated"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-white dark:text-white font-anton text-xl framer-motion-animated"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                MK
              </motion.div>
            </div>
            <motion.span
              className="text-sm font-medium group-hover:text-purple-400 dark:group-hover:text-purple-500 transition-colors framer-motion-animated"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              YOUR SUCCESS, OUR SOFTWARE
            </motion.span>
          </Link>

          <div className="flex items-center">
            <motion.div
              className="hidden md:flex items-center justify-center space-x-8 mx-auto framer-motion-animated"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeIn} custom={0} className="framer-motion-animated">
                <Link
                  href="/"
                  className="text-sm font-medium transition-colors border-b-2 border-transparent hover:text-purple-400 dark:hover:text-purple-600 hover:border-purple-400 dark:hover:border-purple-600 pb-1"
                >
                  Home
                </Link>
              </motion.div>
              <motion.div variants={fadeIn} custom={1} className="framer-motion-animated">
                <Link
                  href="/about"
                  className="text-sm font-medium transition-colors border-b-2 border-transparent hover:text-purple-400 dark:hover:text-purple-600 hover:border-purple-400 dark:hover:border-purple-600 pb-1"
                >
                  About
                </Link>
              </motion.div>
              <motion.div variants={fadeIn} custom={2} className="framer-motion-animated">
                <Link
                  href="#"
                  className="text-sm font-medium transition-colors border-b-2 border-purple-400 dark:border-purple-600 text-purple-400 dark:text-purple-600 pb-1"
                >
                  Testimonials
                </Link>
              </motion.div>
              <motion.div variants={fadeIn} custom={3} className="framer-motion-animated">
                <Link
                  href="/services"
                  className="text-sm font-medium transition-colors border-b-2 border-transparent hover:text-purple-400 dark:hover:text-purple-600 hover:border-purple-400 dark:hover:border-purple-600 pb-1"
                >
                  Services
                </Link>
              </motion.div>
            </motion.div>

            {/* Theme Toggle Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="ml-4 framer-motion-animated"
            >
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full w-10 h-10 bg-slate-800/50 dark:bg-slate-200/50 text-white dark:text-slate-900 hover:bg-slate-700/70 dark:hover:bg-slate-300/70"
                onClick={toggleTheme}
              >
                {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <div className="md:hidden ml-4">
              <MobileMenu routes={routes} />
            </div>

            {/* Get in Touch Button (hidden on small screens) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden md:block framer-motion-animated"
            >
              <Button
                size="sm"
                className="ml-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white rounded"
                onClick={() => (window.location.href = "/#contact")}
              >
                Get in Touch
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="framer-motion-animated"
        >
          <Button
            variant="ghost"
            size="sm"
            className="text-white dark:text-slate-900 hover:text-purple-400 dark:hover:text-purple-600 hover:bg-black/20 dark:hover:bg-white/20 mb-8"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Testimonials Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto framer-motion-animated"
          >
            <motion.h1
              className="text-4xl md:text-5xl font-anton tracking-tight mb-12 text-center framer-motion-animated"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              CLIENT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700">
                TESTIMONIALS
              </span>
            </motion.h1>

            <motion.p
              className="text-gray-300 dark:text-gray-700 text-lg text-center max-w-3xl mx-auto mb-16 framer-motion-animated"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Don't just take my word for it. Here's what my clients have to say about their experience working with me
              and the results we've achieved together.
            </motion.p>

            <motion.div
              className="grid md:grid-cols-2 gap-8 framer-motion-animated"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  variants={fadeIn}
                  custom={index}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="framer-motion-animated"
                >
                  <Card className="border-none bg-slate-900/40 dark:bg-slate-200/40 backdrop-blur-sm border border-purple-500/10 dark:border-purple-600/10 hover:border-purple-500/50 dark:hover:border-purple-600/50 transition-all h-full group">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="mr-4">
                          <motion.div
                            className="w-12 h-12 rounded-full overflow-hidden framer-motion-animated"
                            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                          >
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </motion.div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                          <p className="text-sm text-gray-400 dark:text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="relative">
                        <Quote className="h-8 w-8 text-purple-500/20 dark:text-purple-600/20 absolute -left-2 -top-2" />
                        <p className="text-gray-300 dark:text-gray-700 italic pl-6 pr-6">{testimonial.quote}</p>
                        <Quote className="h-8 w-8 text-purple-500/20 dark:text-purple-600/20 absolute -right-2 bottom-0 rotate-180" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div
              className="mt-16 text-center framer-motion-animated"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="border-none bg-gradient-to-r from-purple-500/20 to-slate-900/40 dark:from-purple-600/20 dark:to-slate-200/40 backdrop-blur-sm border border-purple-500/10 dark:border-purple-600/10 p-8">
                <CardContent className="p-0">
                  <h2 className="text-2xl md:text-3xl font-anton tracking-tight mb-4">
                    READY TO{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700">
                      JOIN THEM?
                    </span>
                  </h2>
                  <p className="text-gray-300 dark:text-gray-700 mb-6 max-w-2xl mx-auto">
                    Let's work together to create something amazing for your business. Contact me today to discuss your
                    project.
                  </p>
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700 hover:from-purple-600 hover:to-pink-700 dark:hover:from-purple-700 dark:hover:to-pink-800 text-white rounded-full flex items-center gap-2 px-6 py-3 mx-auto"
                    onClick={() => (window.location.href = "/#contact")}
                  >
                    Start Your Project <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

