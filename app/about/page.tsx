"use client"

import { Anton, Poppins } from "next/font/google"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Sun, Moon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { MobileMenu } from "@/components/mobile-menu"
import about from "@/app/assets/WhatsApp Image 2025-03-23 at 15.15.26_b2058e00.jpg"

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

export default function AboutPage() {
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
    const STAR_COUNT = 300

    // Create stars
    for (let i = 0; i < STAR_COUNT; i++) {
      const baseRadius = Math.random() * 1.5
      const baseOpacity = Math.random() * 0.7 + 0.3
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: baseRadius,
        opacity: baseOpacity,
        speed: Math.random() * 0.05,
        direction: {
          x: (Math.random() - 0.5) * 0.1,
          y: Math.random() * 0.05,
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
        className="fixed top-0 left-0 right-0 z-50 py-6 bg-slate-950/80 dark:bg-white/80 backdrop-blur-md transition-colors duration-500"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="relative w-10 h-10 mr-2 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-purple-600 dark:bg-purple-700 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-black dark:text-white font-anton text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                MK
              </motion.div>
            </div>
            <motion.span
              className="text-sm font-medium group-hover:text-purple-400 dark:group-hover:text-purple-500 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              YOUR SUCCESS, OUR SOFTWARE
            </motion.span>
          </Link>

          <div className="flex items-center">
            <motion.div
              className="hidden md:flex items-center justify-center space-x-8 mx-auto"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeIn} custom={0}>
                <Link
                  href="/"
                  className="text-sm font-medium transition-colors border-b-2 border-transparent hover:text-purple-400 dark:hover:text-purple-600 hover:border-purple-400 dark:hover:border-purple-600 pb-1"
                >
                  Home
                </Link>
              </motion.div>
              <motion.div variants={fadeIn} custom={1}>
                <Link
                  href="#"
                  className="text-sm font-medium transition-colors border-b-2 border-purple-400 dark:border-purple-600 text-purple-400 dark:text-purple-600 pb-1"
                >
                  About
                </Link>
              </motion.div>
              <motion.div variants={fadeIn} custom={2}>
                <Link
                  href="/testimonials"
                  className="text-sm font-medium transition-colors border-b-2 border-transparent hover:text-purple-400 dark:hover:text-purple-600 hover:border-purple-400 dark:hover:border-purple-600 pb-1"
                >
                  Testimonials
                </Link>
              </motion.div>
              <motion.div variants={fadeIn} custom={3}>
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
              className="ml-4"
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
              className="hidden md:block"
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
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
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

      {/* About Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Update motion components with framer-motion-animated class */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto framer-motion-animated"
          >
            <motion.h1
              className="text-4xl md:text-5xl font-anton tracking-tight mb-12 text-center framer-motion-animated"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              ABOUT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700">
                ME
              </span>
            </motion.h1>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                className="framer-motion-animated"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden border border-purple-500/20 dark:border-purple-600/20 group">
                  <Image
                    src={about}
                    alt="Profile"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent dark:from-slate-100/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6 framer-motion-animated"
              >
                <motion.p
                  className="text-gray-300 dark:text-gray-700 text-lg"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  I am Muhammad Khalid, a passionate full-stack developer specializing in building exceptional digital
                  experiences. With a focus on React.js and Next.js, I create high-performance web applications that
                  combine beautiful design with powerful functionality.
                </motion.p>

                <motion.p
                  className="text-gray-300 dark:text-gray-700 text-lg"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  My approach combines technical expertise with creative problem-solving to deliver solutions that not
                  only meet but exceed client expectations. I believe in clean code, responsive design, and user-centric
                  development.
                </motion.p>

                <motion.p
                  className="text-gray-300 dark:text-gray-700 text-lg"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  With over 5 years of experience in web development, I've worked with clients ranging from startups to
                  established businesses across various industries. My goal is to help businesses grow through
                  technology and create digital products that users love.
                </motion.p>
              </motion.div>
            </div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-16 framer-motion-animated"
            >
              <h2 className="text-3xl font-anton tracking-tight mb-8 text-center">
                MY{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700">
                  SKILLS
                </span>
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "Frontend", skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
                  { name: "Backend", skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL"] },
                  { name: "Tools", skills: ["Git", "Docker", "AWS", "Vercel", "Figma"] },
                  {
                    name: "Other",
                    skills: ["SEO", "Performance Optimization", "Responsive Design", "Accessibility", "Testing"],
                  },
                ].map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="space-y-4 framer-motion-animated"
                  >
                    <h3 className="text-xl font-semibold text-purple-400 dark:text-purple-600">{category.name}</h3>
                    <ul className="space-y-2">
                      {category.skills.map((skill) => (
                        <li key={skill} className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-purple-400 dark:text-purple-600 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-300 dark:text-gray-700">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Experience Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-16 framer-motion-animated"
            >
              <h2 className="text-3xl font-anton tracking-tight mb-8 text-center">
                WORK{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700">
                  EXPERIENCE
                </span>
              </h2>

              <div className="space-y-8">
                {[
                  {
                    role: "Senior Frontend Developer",
                    company: "TechInnovate",
                    period: "2021 - Present",
                    description:
                      "Lead the development of modern web applications using React.js and Next.js. Implemented performance optimizations that improved load times by 40%.",
                  },
                  {
                    role: "Full Stack Developer",
                    company: "WebSolutions Inc.",
                    period: "2019 - 2021",
                    description:
                      "Developed and maintained multiple client projects using the MERN stack. Collaborated with designers to implement responsive and accessible user interfaces.",
                  },
                  {
                    role: "Junior Web Developer",
                    company: "Digital Creatives",
                    period: "2018 - 2019",
                    description:
                      "Built and maintained client websites. Worked on frontend development using HTML, CSS, and JavaScript. Assisted in the implementation of responsive designs.",
                  },
                ].map((job, index) => (
                  <motion.div
                    key={job.company}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="border-l-2 border-purple-400 dark:border-purple-600 pl-6 relative framer-motion-animated"
                  >
                    <div className="absolute w-4 h-4 bg-purple-400 dark:bg-purple-600 rounded-full -left-[9px] top-1" />
                    <h3 className="text-xl font-semibold">{job.role}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-purple-400 dark:text-purple-600">{job.company}</p>
                      <Badge className="bg-slate-800/40 dark:bg-slate-200/40 border border-purple-500/10 dark:border-purple-600/10">
                        {job.period}
                      </Badge>
                    </div>
                    <p className="text-gray-300 dark:text-gray-700">{job.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="framer-motion-animated"
            >
              <h2 className="text-3xl font-anton tracking-tight mb-8 text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700">
                  EDUCATION
                </span>
              </h2>

              <Card className="border-none bg-slate-900/40 dark:bg-slate-200/40 backdrop-blur-sm border border-purple-500/10 dark:border-purple-600/10 hover:border-purple-500/50 dark:hover:border-purple-600/50 transition-all">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white dark:text-black">MERN Stack Development</h3>
                      <p className="text-purple-400 dark:text-purple-600">Saylani Mass IT Training Program</p>
                      <p className="text-gray-400 dark:text-gray-600">2023 - 2025</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white dark:text-black">BS In Software Enginnering</h3>
                      <p className="text-purple-400 dark:text-purple-600">Sindh Maddarsatul Islam University</p>
                      <p className="text-gray-400 dark:text-gray-600">In present </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

