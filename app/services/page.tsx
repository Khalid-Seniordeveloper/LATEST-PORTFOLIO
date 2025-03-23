"use client"

import { Anton, Poppins } from "next/font/google"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Code, Palette, Send, Sun, Moon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
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

export default function ServicesPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Parallax effect for stars
  const starsY = useTransform(scrollYProgress, [0, 1], [0, 300])

  useEffect(() => {
    setMounted(true)
  }, [])

  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   if (!canvas) return

  //   const ctx = canvas.getContext("2d")
  //   if (!ctx) return

  //   // Set canvas dimensions
  //   const setCanvasDimensions = () => {
  //     canvas.width = window.innerWidth
  //     canvas.height = window.innerHeight * 3 // Make canvas taller for parallax
  //   }

  //   setCanvasDimensions()
  //   window.addEventListener("resize", setCanvasDimensions)

  //   // Star properties
  //   interface Star {
  //     x: number
  //     y: number
  //     radius: number
  //     opacity: number
  //     speed: number
  //     pulse: number
  //     pulseFactor: number
  //     pulseSpeed: number
  //     direction: { x: number; y: number }
  //   }

  //   const stars: Star[] = []
  //   const STAR_COUNT = 300

  //   // Create stars
  //   for (let i = 0; i < STAR_COUNT; i++) {
  //     const baseRadius = Math.random() * 1.5
  //     const baseOpacity = Math.random() * 0.7 + 0.3
  //     stars.push({
  //       x: Math.random() * canvas.width,
  //       y: Math.random() * canvas.height,
  //       radius: baseRadius,
  //       opacity: baseOpacity,
  //       speed: Math.random() * 0.05,
  //       pulse: 0,
  //       pulseFactor: Math.random() * 0.5 + 0.5,
  //       pulseSpeed: Math.random() * 0.02 + 0.01,
  //       direction: {
  //         x: (Math.random() - 0.5) * 0.1,
  //         y: Math.random() * 0.05,
  //       },
  //     })
  //   }

  //   // Animation loop
  //   let animationFrameId: number

  //   const animate = () => {
  //     ctx.clearRect(0, 0, canvas.width, canvas.height)

  //     // Draw stars
  //     stars.forEach((star) => {
  //       // Update pulse
  //       star.pulse += star.pulseSpeed
  //       if (star.pulse > Math.PI * 2) {
  //         star.pulse = 0
  //       }

  //       // Apply pulse effect
  //       const pulseFactor = Math.sin(star.pulse) * star.pulseFactor
  //       star.radius = star.radius * (1 + pulseFactor * 0.2)
  //       star.opacity = star.opacity * (1 + pulseFactor * 0.1)

  //       // Draw star
  //       ctx.beginPath()
  //       ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
  //       ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
  //       ctx.fill()

  //       // Move stars
  //       star.x += star.direction.x
  //       star.y += star.direction.y

  //       // Reset stars that go off screen
  //       if (star.y > canvas.height) {
  //         star.y = 0
  //         star.x = Math.random() * canvas.width
  //       } else if (star.y < 0) {
  //         star.y = canvas.height
  //         star.x = Math.random() * canvas.width
  //       }

  //       if (star.x > canvas.width) {
  //         star.x = 0
  //         star.y = Math.random() * canvas.height
  //       } else if (star.x < 0) {
  //         star.x = canvas.width
  //         star.y = Math.random() * canvas.height
  //       }
  //     })

  //     animationFrameId = requestAnimationFrame(animate)
  //   }

  //   animationFrameId = requestAnimationFrame(animate)

  //   return () => {
  //     window.removeEventListener("resize", setCanvasDimensions)
  //     cancelAnimationFrame(animationFrameId)
  //   }
  // }, [])

  // Force animations to play on every visit
  useEffect(() => {
    // Reset any animation states
    const animatedElements = document.querySelectorAll(".framer-motion-animated")
    animatedElements.forEach((el) => {
      el.classList.remove("framer-motion-animated")
      el.classList.add("framer-motion-animated")
    })
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
  const routes = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/#projects" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/#contact" },
  ]
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

  const services = [
    {
      icon: <Code className="h-6 w-6 text-purple-400 dark:text-purple-600" />,
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
      icon: <Palette className="h-6 w-6 text-purple-400 dark:text-purple-600" />,
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
          className="text-purple-400 dark:text-purple-600"
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
          className="text-purple-400 dark:text-purple-600"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M7 7h10" />
          <path d="M7 12h10" />
          <path d="M7 17h10" />
        </svg>
      ),
      title: "Database Design",
      description:
        "Efficient and scalable database solutions tailored to your specific needs. From schema design to optimization.",
      features: ["Schema Design", "Data Modeling", "Database Migration", "Performance Tuning", "Data Security"],
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
          className="text-purple-400 dark:text-purple-600"
        >
          <path d="M12 2v8" />
          <path d="m4.93 10.93 1.41 1.41" />
          <path d="M2 18h2" />
          <path d="M20 18h2" />
          <path d="m19.07 10.93-1.41 1.41" />
          <path d="M22 22H2" />
          <path d="m8 22 4-10 4 10" />
          <path d="M12 14v4" />
        </svg>
      ),
      title: "Performance Optimization",
      description:
        "Improve the speed and efficiency of your web applications. Identify and fix bottlenecks for a better user experience.",
      features: [
        "Load Time Optimization",
        "Code Splitting",
        "Lazy Loading",
        "Caching Strategies",
        "Image Optimization",
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
          className="text-purple-400 dark:text-purple-600"
        >
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.25" />
          <path d="M21 3v9h-9" />
        </svg>
      ),
      title: "Maintenance & Support",
      description:
        "Ongoing maintenance and support for your web applications. Keep your software up-to-date and running smoothly.",
      features: ["Bug Fixing", "Feature Updates", "Security Patches", "Performance Monitoring", "Technical Support"],
    },
  ]

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

      {/* Services Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto framer-motion-animated"
          >
            <motion.h1
              className="text-4xl md:text-5xl font-anton tracking-tight mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              MY{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700">
                SERVICES
              </span>
            </motion.h1>

            <motion.p
              className="text-gray-300 dark:text-gray-700 text-lg text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I offer a comprehensive range of web development services to help businesses establish a strong online
              presence. From concept to deployment, I ensure that every project is delivered with the highest quality
              and attention to detail.
            </motion.p>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={fadeIn}
                  custom={index}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <Card className="border-none bg-slate-900/40 dark:bg-slate-200/40 backdrop-blur-sm border border-purple-500/10 dark:border-purple-600/10 hover:border-purple-500/50 dark:hover:border-purple-600/50 transition-all h-full group">
                    <CardContent className="p-6">
                      <motion.div
                        className="rounded-full bg-purple-500/10 dark:bg-purple-600/10 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 dark:group-hover:bg-purple-600/20 transition-colors"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        {service.icon}
                      </motion.div>
                      <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                      <p className="text-gray-300 dark:text-gray-700 mb-4">{service.description}</p>

                      {/* Features section that appears on hover with animation */}
                      <div className="overflow-hidden">
                        <AnimatePresence>
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            whileHover={{ height: "auto", opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="group-hover:block"
                          >
                            <h3 className="text-sm font-semibold text-purple-400 dark:text-purple-600 mb-2">
                              Features:
                            </h3>
                            <ul className="space-y-1">
                              {service.features.map((feature, i) => (
                                <motion.li
                                  key={feature}
                                  className="flex items-start text-sm text-gray-300 dark:text-gray-700"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: i * 0.1 }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-purple-400 dark:text-purple-600 mr-2 mt-1 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  {feature}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="border-none bg-gradient-to-r from-purple-500/20 to-slate-900/40 dark:from-purple-600/20 dark:to-slate-200/40 backdrop-blur-sm border border-purple-500/10 dark:border-purple-600/10 p-8">
                <CardContent className="p-0">
                  <h2 className="text-2xl md:text-3xl font-anton tracking-tight mb-4">
                    READY TO{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700">
                      START A PROJECT?
                    </span>
                  </h2>
                  <p className="text-gray-300 dark:text-gray-700 mb-6 max-w-2xl mx-auto">
                    Let's discuss your project requirements and how I can help you achieve your business goals with a
                    custom web solution.
                  </p>
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700 hover:from-purple-600 hover:to-pink-700 dark:hover:from-purple-700 dark:hover:to-pink-800 text-white rounded-full flex items-center gap-2 px-6 py-3 mx-auto"
                    onClick={() => (window.location.href = "/#contact")}
                  >
                    Get in Touch <Send className="h-4 w-4" />
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

