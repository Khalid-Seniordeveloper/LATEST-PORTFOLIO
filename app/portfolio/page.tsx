"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MobileMenu } from '@/components/mobile-menu';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import  figma  from '@/app/assets/figma.png';
import vercel from "@/app/assets/vercel.png";
import react from "@/app/assets/react.png";
import next from "@/app/assets/next.png";
import mongod from "@/app/assets/mongod.png";
import ex from "@/app/assets/ex.png";
import gsap from "@/app/assets/gsap.jpg";
import talwind from "@/app/assets/talwind.png";
import ts from "@/app/assets/ts.png";
import ec from "@/app/assets/ec.jpg"
import gen from "@/app/assets/gen.jpg"
export default function PortfolioSection () {
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
      const portfolioProjects = [
        {
          title: "PixelForge",
          subtitle: "AI-Powered Design Tool",
          tech: "React + Node.js",
          client: "Developed for a German startup",
          overview:
            "PixelForge is an AI-based platform that assists designers by auto-generating mockups, brand kits, and responsive layouts for web and mobile applications.",
          features: ["AI-driven UI suggestions", "Real-time design collaboration tools"],
          description:
            "I created a highly dynamic frontend integrated with AI APIs, focusing on enhancing the creative workflow of digital artists and UI/UX designers.",
          image: gen,
          mobileImage: pf,
          link: "#",
        },
        {
          title: "FoodDeck",
          subtitle: "Smart Recipe & Meal Planner",
          tech: "Next.js + Firebase",
          client: "Developed for a Health & Fitness Brand",
          overview:
            "FoodDeck is a smart recipe suggestion and meal planning platform that tailors recipes to user preferences, dietary needs, and available ingredients.",
          features: ["AI-powered meal suggestions", "Weekly grocery list generator"],
          description:
            "I engineered a sleek, intuitive interface that offers personalized meal plans, helping users maintain a healthy lifestyle through smart food choices.",
          image: "/placeholder.svg?height=600&width=800",
          mobileImage: "/placeholder.svg?height=400&width=200",
          link: "#",
        },
      ];
      
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
        { name: "Portfolio", path: "/portfolio" },
    
        { name: "Projects", path: "/#projects" },
        { name: "Testimonials", path: "/testimonials" },
        { name: "Contact", path: "/#contact" },
      ]
        const { theme, setTheme } = useTheme()
        const [mounted, setMounted] = useState(false)
       useEffect(() => {
          setMounted(true)
        }, [])
      
      const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
      }
  return (
    <>
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
    <section id="portfolio" className="min-h-screen py-20 bg-slate-900/50 dark:bg-slate-200/50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2
          className="text-4xl md:text-5xl font-anton tracking-tight mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          RECENT{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700">
            PROJECTS
          </span>
        </motion.h2>

        <div className="space-y-32">
          {portfolioProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`grid grid-cols-1 ${index % 2 === 0 ? "lg:grid-cols-[1fr_1.5fr]" : "lg:grid-cols-[1.5fr_1fr]"} gap-8 items-center`}
            >
              <motion.div
                className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-3xl font-anton tracking-tight">{project.title}</h3>
                <p className="text-purple-400 dark:text-purple-600">{project.subtitle}</p>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Tech Stack:</span>
                    <span className="text-gray-300 dark:text-gray-700">{project.tech}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Client:</span>
                    <span className="text-gray-300 dark:text-gray-700">{project.client}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">Overview</h4>
                  <p className="text-gray-300 dark:text-gray-700">{project.overview}</p>
                </div>

                <div className="space-y-2">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-400 dark:text-purple-600 mr-2 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <p className="text-gray-300 dark:text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>

                <p className="text-gray-300 dark:text-gray-700">{project.description}</p>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className="border border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20 dark:bg-purple-600/10 dark:hover:bg-purple-600/20 text-white dark:text-slate-900 rounded-full flex items-center gap-2 px-6 py-3 relative overflow-hidden group"
                    asChild
                  >
                    <Link href={project.link}>
                      <span className="relative z-10">Browse the platform</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 relative z-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}
initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: 0.4 }}
>
{/* Laptop Image */}
<div className="relative rounded-xl overflow-hidden border border-purple-500/20 dark:border-purple-600/20 aspect-video">
<Image
  src={ project.mobileImage || "/placeholder.svg"}
  alt={project.title}
  fill
  className="object-cover"
/>
</div>

{/* Mobile Image */}
<motion.div
className="absolute -bottom-10 mobile-div -right-10 md:bottom-10 md:right-10 w-20 h-40 sm:w-24 sm:h-48 md:w-32 md:h-64 rounded-xl overflow-hidden border-2 border-purple-500 dark:border-purple-600 shadow-lg shadow-purple-500/20 dark:shadow-purple-600/20"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: 0.8 }}
>
<Image
  src={project.mobileImage || "/placeholder.svg"}
  alt={`${project.title} mobile view`}
  fill
  className="object-cover"
/>
</motion.div>
</motion.div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
  className="mt-32 pt-16 border-t border-purple-500/10 dark:border-purple-600/10"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  <h3 className="text-center text-xl font-semibold mb-12 text-gray-400 dark:text-gray-600">
    Technologies I Work With
  </h3>
  <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
    {[
      { name: "Figma", icon: figma },
      { name: "Vercel", icon: vercel },
      { name: "React", icon: react },
      { name: "Next.js", icon: next },
      { name: "TailwindCSS", icon: talwind },
      { name: "TypeScript", icon: ts },
      { name: "MongoDB", icon: mongod },
      { name: "Express", icon: ex },
      { name: "GSAP", icon: gsap },
    ].map((tech, index) => (
      <motion.div
        key={tech.name}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="flex flex-col items-center"
      >
        <Image
          src={tech.icon || "/placeholder.svg"}
          alt={tech.name}
          width={40}
          height={40}
          className="transition-all duration-300" // Removed grayscale classes
        />
        <span className="text-xs text-gray-500 dark:text-gray-600 mt-2">
          {tech.name}
        </span>
      </motion.div>
    ))}
  </div>
</motion.div>
      </motion.div>
    </div>
  </section>
  </>
  )
}
