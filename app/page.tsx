"use client"

import type React from "react"

import { Anton, Poppins } from "next/font/google"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Code, Github, Palette, Send, Sun, Moon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { MobileMenu } from "@/components/mobile-menu"
import { ProjectsSection } from "@/components/projects-section"
import { ServicesSection } from "@/components/services-section"
import {PortfolioSection} from "@/components/portfoliosection"
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

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const [activeSection, setActiveSection] = useState("home")
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Parallax effect for stars
  const starsY = useTransform(scrollYProgress, [0, 1], [0, 300])

  // Navigation routes
  const routes = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Portfolio", path: "/portfolio" },

    { name: "Services", path: "/services" },
    { name: "Projects", path: "/#projects" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/#contact" },
  ]

  // Add this function to handle navigation and prevent default behavior
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    router.push(path)
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsFormSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsFormSubmitting(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      alert("Message sent successfully! We will get back to you soon.")
    }, 1500)
  }

  // Navigation handler
  const handleNavigation = (path: string) => {
    router.push(path)
  }

  // Theme toggle handler
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

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
      baseRadius: number
      opacity: number
      baseOpacity: number
      speed: number
      pulse: number
      pulseFactor: number
      pulseSpeed: number
      direction: { x: number; y: number }
    }

    const stars: Star[] = []
    const STAR_COUNT = 400

    // Create stars
    for (let i = 0; i < STAR_COUNT; i++) {
      const baseRadius = Math.random() * 1.5
      const baseOpacity = Math.random() * 0.7 + 0.3
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: baseRadius,
        baseRadius: baseRadius,
        opacity: baseOpacity,
        baseOpacity: baseOpacity,
        speed: Math.random() * 0.05,
        pulse: 0,
        pulseFactor: Math.random() * 0.5 + 0.5,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        direction: {
          x: (Math.random() - 0.5) * 0.1,
          y: Math.random() * 0.05,
        },
      })
    }

    // Animation loop
    let animationFrameId: number
    let lastTime = 0

    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        // Update pulse
        star.pulse += star.pulseSpeed
        if (star.pulse > Math.PI * 2) {
          star.pulse = 0
        }

        // Apply pulse effect
        const pulseFactor = Math.sin(star.pulse) * star.pulseFactor
        star.radius = star.baseRadius * (1 + pulseFactor * 0.2)
        star.opacity = star.baseOpacity * (1 + pulseFactor * 0.1)

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        // Move stars
        star.x += star.direction.x * (deltaTime || 16)
        star.y += star.direction.y * (deltaTime || 16)

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

    // Intersection Observer for sections
    const sections = document.querySelectorAll("section[id]")

    const observerOptions = {
      rootMargin: "-10% 0px -90% 0px",
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
      sections.forEach((section) => {
        observer.unobserve(section)
      })
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

  // Services data
  const services = [
    {
      icon: <Code className="h-6 w-6 text-purple-400" />,
      title: "Web Development",
      description:
        "Custom web applications built with modern frameworks like React and Next.js. Responsive, accessible, and optimized for performance.",
      features: [
        "Single Page Applications (SPAs)",
        "Progressive Web Apps (PWAs)",
        "E-commerce Solutions",
        "Content Management Systems",
        "Custom Admin Dashboards",
      ],
    },
    {
      icon: <Palette className="h-6 w-6 text-purple-400" />,
      title: "UI/UX Design",
      description:
        "Intuitive and visually appealing interfaces that enhance user experience. From wireframes to polished designs.",
      features: [
        "User Interface Design",
        "User Experience Research",
        "Wireframing & Prototyping",
        "Design Systems",
        "Responsive Design",
      ],
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-400"
        >
          <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
          <line x1="8" x2="8" y1="16" y2="16" />
          <line x1="8" x2="8" y1="20" y2="20" />
          <line x1="12" x2="12" y1="18" y2="18" />
          <line x1="12" x2="12" y1="22" y2="22" />
          <line x1="16" x2="16" y1="16" y2="16" />
          <line x1="16" x2="16" y1="20" y2="20" />
        </svg>
      ),
      title: "API Development",
      description:
        "Robust and scalable APIs built with Node.js. RESTful or GraphQL endpoints that power your applications.",
      features: [
        "RESTful API Design",
        "GraphQL API Development",
        "API Documentation",
        "Authentication & Authorization",
        "Performance Optimization",
      ],
    },
  ]

  // Portfolio projects data
  const portfolioProjects = [
    {
      title: "Skorboard",
      subtitle: "Real-time Score Tracking Platform",
      tech: "MERN Stack",
      client: "Built for a USA client",
      overview:
        "Skorboard is a real-time socket-based web app developed by Fantronics, covering live scores for MLB, NHL, NFL, NCAAF, CBK, and NBA league matches.",
      features: ["Real-time live score updates", "Built using WebSockets for instant data transmission"],
      description:
        "I developed an interactive and responsive UI to provide sports fans with seamless real-time game updates.",
      image: "/placeholder.svg?height=600&width=800",
      mobileImage: "/placeholder.svg?height=400&width=200",
      link: "#",
    },
    {
      title: "E-Commerce Platform",
      subtitle: "Online Shopping Experience",
      tech: "Next.js + Stripe",
      client: "Built for a Retail Business",
      overview:
        "A complete e-commerce solution with product catalog, shopping cart, user authentication, and payment processing.",
      features: ["Responsive product catalog with filtering", "Secure payment processing with Stripe"],
      description:
        "I designed and developed a full-featured e-commerce platform with a focus on user experience and conversion optimization.",
      image: "/placeholder.svg?height=600&width=800",
      mobileImage: "/placeholder.svg?height=400&width=200",
      link: "#",
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
      className={`${poppins.variable} ${anton.variable} font-poppins bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 dark:bg-gradient-to-b dark:from-slate-100 dark:via-indigo-50 dark:to-slate-100 text-white dark:text-slate-900 relative transition-colors duration-500`}
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
              className="hidden md:flex items-center justify-center space-x-8 mx-auto"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeIn} custom={0}>
                <Link
                  href="#home"
                  onClick={(e) => handleNavClick(e, "#home")}
                  className={`text-sm font-medium transition-colors border-b-2 pb-1 ${activeSection === "home" ? "text-purple-400 dark:text-purple-600 border-purple-400 dark:border-purple-600" : "border-transparent hover:text-purple-400 dark:hover:text-purple-600 hover:border-purple-400 dark:hover:border-purple-600"}`}
                >
                  Home
                </Link>
              </motion.div>
              <motion.div variants={fadeIn} custom={1}>
                <Link
                  href="#about"
                  onClick={(e) => handleNavClick(e, "#about")}
                  className={`text-sm font-medium transition-colors border-b-2 pb-1 ${activeSection === "about" ? "text-purple-400 dark:text-purple-600 border-purple-400 dark:border-purple-600" : "border-transparent hover:text-purple-400 dark:hover:text-purple-600 hover:border-purple-400 dark:hover:border-purple-600"}`}
                >
                  About
                </Link>
              </motion.div>
              <motion.div variants={fadeIn} custom={2}>
                <Link
                  href="#projects"
                  onClick={(e) => handleNavClick(e, "#projects")}
                  className={`text-sm font-medium transition-colors border-b-2 pb-1 ${activeSection === "projects" ? "text-purple-400 dark:text-purple-600 border-purple-400 dark:border-purple-600" : "border-transparent hover:text-purple-400 dark:hover:text-purple-600 hover:border-purple-400 dark:hover:border-purple-600"}`}
                >
                  Projects
                </Link>
              </motion.div>
              <motion.div variants={fadeIn} custom={3}>
                <Link
                  href="#services"
                  onClick={(e) => handleNavClick(e, "#services")}
                  className={`text-sm font-medium transition-colors border-b-2 pb-1 ${activeSection === "services" ? "text-purple-400 dark:text-purple-600 border-purple-400 dark:border-purple-600" : "border-transparent hover:text-purple-400 dark:hover:text-purple-600 hover:border-purple-400 dark:hover:border-purple-600"}`}
                >
                  Services
                </Link>
              </motion.div>
              <motion.div variants={fadeIn} custom={4}>
                <Link
                  href="#testimonials"
                  onClick={(e) => handleNavClick(e, "#testimonials")}
                  className={`text-sm font-medium transition-colors border-b-2 pb-1 ${activeSection === "testimonials" ? "text-purple-400 dark:text-purple-600 border-purple-400 dark:border-purple-600" : "border-transparent hover:text-purple-400 dark:hover:text-purple-600 hover:border-purple-400 dark:hover:border-purple-600"}`}
                >
                  Testimonials
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

            {/* Mobile Menu Button (visible on small screens) */}
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
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get in Touch
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-anton tracking-tight mb-6 leading-tight framer-motion-animated"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              I DEVELOP PREMIUM
              <br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700 framer-motion-animated"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                CUSTOM WEB
              </motion.span>
              <br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700 framer-motion-animated"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                APPLICATIONS
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-gray-400 dark:text-gray-600 mb-8 text-lg max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              High-performance React.js and Next.js web applications, crafted with precision and passion.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="border border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20 dark:bg-purple-600/10 dark:hover:bg-purple-600/20 text-white dark:text-slate-900 rounded-full flex items-center gap-2 px-6 py-3 relative overflow-hidden group"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="relative z-10">Book a Consultation</span>
                <ArrowUpRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <motion.span
                  className="absolute inset-0 bg-purple-500 dark:bg-purple-600 opacity-0 group-hover:opacity-20 transition-opacity"
                  initial={false}
                  whileHover={{ opacity: 0.2, transition: { duration: 0.3 } }}
                />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-anton tracking-tight mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              ABOUT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700">
                ME
              </span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <div className="relative aspect-square rounded-xl overflow-hidden border border-purple-500/20 dark:border-purple-600/20 group">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Profile"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent dark:from-slate-100/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <motion.p
                  className="text-gray-300 dark:text-gray-700 text-lg"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
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
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={1}
                >
                  My approach combines technical expertise with creative problem-solving to deliver solutions that not
                  only meet but exceed client expectations. I believe in clean code, responsive design, and user-centric
                  development.
                </motion.p>

                <motion.div
                  className="pt-4"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={2}
                >
                  <h3 className="text-xl font-semibold mb-4">My Expertise</h3>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {["React.js", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "MongoDB"].map((skill, index) => (
                      <motion.div
                        key={skill}
                        variants={fadeIn}
                        custom={index}
                        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                      >
                        <Badge className="bg-purple-500/20 text-purple-400 dark:bg-purple-600/20 dark:text-purple-700 hover:bg-purple-500/30 dark:hover:bg-purple-600/30">
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={3}
                  className="pt-4"
                >
                  <Button
                    className="border border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20 dark:bg-purple-600/10 dark:hover:bg-purple-600/20 text-white dark:text-slate-900 rounded-full flex items-center gap-2 px-6 py-3 relative overflow-hidden group"
                    onClick={() => router.push("/about")}
                  >
                    <span className="relative z-10">Learn More</span>
                    <ArrowUpRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <motion.span
                      className="absolute inset-0 bg-purple-500 dark:bg-purple-600 opacity-0 group-hover:opacity-20 transition-opacity"
                      initial={false}
                      whileHover={{ opacity: 0.2, transition: { duration: 0.3 } }}
                    />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />
      {/* portfolio section  */}
      <PortfolioSection/>

      {/* Services Section */}
      <ServicesSection />

      {/* Testimonials Section */}
      <section id="testimonials" className="min-h-screen flex items-center py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-anton tracking-tight mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              CLIENT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700">
                TESTIMONIALS
              </span>
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
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
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  variants={fadeIn}
                  custom={index}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <Card className="border-none bg-slate-900/40 dark:bg-slate-200/40 backdrop-blur-sm border border-purple-500/10 dark:border-purple-600/10 hover:border-purple-500/50 dark:hover:border-purple-600/50 transition-all h-full group">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="mr-4">
                          <motion.div
                            className="w-12 h-12 rounded-full overflow-hidden"
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
                      <p className="text-gray-300 dark:text-gray-700 italic relative">
                        <span className="absolute -left-2 -top-2 text-3xl text-purple-500/30 dark:text-purple-600/30">
                          "
                        </span>
                        {testimonial.quote}
                        <span className="absolute -right-2 bottom-0 text-3xl text-purple-500/30 dark:text-purple-600/30">
                          "
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="border border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20 dark:bg-purple-600/10 dark:hover:bg-purple-600/20 text-white dark:text-slate-900 rounded-full flex items-center gap-2 px-6 py-3 mx-auto relative overflow-hidden group"
                onClick={() => router.push("/testimonials")}
              >
                <span className="relative z-10">View All Testimonials</span>
                <ArrowUpRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <motion.span
                  className="absolute inset-0 bg-purple-500 dark:bg-purple-600 opacity-0 group-hover:opacity-20 transition-opacity"
                  initial={false}
                  whileHover={{ opacity: 0.2, transition: { duration: 0.3 } }}
                />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-anton tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              GET IN{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700">
                TOUCH
              </span>
            </motion.h2>
            <motion.p
              className="text-gray-400 dark:text-gray-600 mb-12 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form className="space-y-4 text-left" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    className="space-y-2"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0}
                  >
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-purple-500/20 dark:border-purple-600/20 bg-slate-900/20 dark:bg-slate-200/20 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:focus-visible:ring-purple-600 focus-visible:ring-offset-2"
                      placeholder="Your name"
                      required
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={1}
                  >
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-purple-500/20 dark:border-purple-600/20 bg-slate-900/20 dark:bg-slate-200/20 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:focus-visible:ring-purple-600 focus-visible:ring-offset-2"
                      placeholder="Your email"
                      required
                    />
                  </motion.div>
                </div>
                <motion.div
                  className="space-y-2"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={2}
                >
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-purple-500/20 dark:border-purple-600/20 bg-slate-900/20 dark:bg-slate-200/20 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:focus-visible:ring-purple-600 focus-visible:ring-offset-2"
                    placeholder="Subject"
                    required
                  />
                </motion.div>
                <motion.div
                  className="space-y-2"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={3}
                >
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="flex min-h-[120px] w-full rounded-md border border-purple-500/20 dark:border-purple-600/20 bg-slate-900/20 dark:bg-slate-200/20 px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:focus-visible:ring-purple-600 focus-visible:ring-offset-2"
                    placeholder="Your message"
                    required
                  />
                </motion.div>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={4}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full gap-2 bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700 hover:from-purple-600 hover:to-pink-700 dark:hover:from-purple-700 dark:hover:to-pink-800 text-white relative overflow-hidden rounded-full"
                    disabled={isFormSubmitting}
                  >
                    {isFormSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-500/10 dark:border-purple-600/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="mb-4 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="text-xl font-anton tracking-wider flex items-center group">
                <div className="relative w-8 h-8 mr-2 overflow-hidden">
                  <div className="absolute inset-0 bg-purple-600 dark:bg-purple-700 rounded-full group-hover:bg-purple-500 dark:group-hover:bg-purple-600 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center text-white font-anton text-sm">
                    MK
                  </div>
                </div>
                <span className="group-hover:text-purple-400 dark:group-hover:text-purple-600 transition-colors">
                  PORTFOLIO
                </span>
              </Link>
              <p className="text-sm text-gray-400 dark:text-gray-600 mt-1">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </motion.div>
            <motion.div
              className="flex space-x-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: <Github className="h-5 w-5" />, label: "GitHub", href: "#" },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-twitter"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  ),
                  label: "Twitter",
                  href: "#",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                  label: "LinkedIn",
                  href: "#",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-instagram"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  ),
                  label: "Instagram",
                  href: "#",
                },
              ].map((social, index) => (
                <motion.div key={social.label} variants={fadeIn} custom={index}>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="text-white dark:text-slate-900 hover:text-purple-400 dark:hover:text-purple-600 hover:bg-slate-900/20 dark:hover:bg-slate-200/20"
                  >
                    <Link href={social.href} aria-label={social.label}>
                      {social.icon}
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </footer>
    </main>
  )
}

