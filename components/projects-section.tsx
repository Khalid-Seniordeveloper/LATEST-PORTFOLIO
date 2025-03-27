"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Code, Palette, Database } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import chatbot from "@/app/assets/chatbot.jpg"
import furniture from "@/app/assets/fthumbnail.png"
import car from "@/app/assets/Screenshot 2025-03-07 204056.png"
import ecc from "@/app/assets/ecc.png"
import gam from "@/app/assets/gam.png"
interface Project {
  id: string
  title: string
  description: string
  image: string
  mobileImage?: string
  tags: string[]
  github: string
  liveUrl: string
  category: "frontend" | "fullstack" | "design"
}

export function ProjectsSection() {
  const projects: Project[] = [
    {
      id: "project-1",
      title: "Chatbot Builder",
      description: "Turn your website and PDFs into smart chatbots instantly. Embed and engage with ease!",
      image: chatbot,
      mobileImage: "/placeholder.svg?height=400&width=200",
      tags: ["Next.js", "Tailwind CSS", "Lang Chain", "MongoDB"],
      github: "https://github.com",
      liveUrl: "https://backend-chatbotbuuilder.vercel.app/",
      category: "fullstack",
    },
    {
      id: "project-2",
      title: "E COMMERCE",
      description: "Experience lightning-fast shopping with our Next.js & Tailwind-powered platform. Smooth, stylish, and built for the future!",
      image: ecc,
      mobileImage: "/placeholder.svg?height=400&width=200",
      tags: ["Next.js", "Tailwind CSS", "MongoDB"],
      github: "https://github.com/Khalid-Seniordeveloper/E-COMMERCE-",
      liveUrl: "https://e-commerce-tan-zeta-42.vercel.app/",
      category: "Frontend",
    },
    {
      id: "project-3",
      title: "Gaming Website",
      description: "Step into the ultimate gaming arena – where skills meet thrill! Play, compete, and dominate with the best!",
      image: gam,
      mobileImage: "/placeholder.svg?height=400&width=200",
      tags: ["Next.js", "Tailwind CSS", "MongoDB"],
      github: "https://github.com/Khalid-Seniordeveloper/GAMING-WEB-",
      liveUrl: "https://gaming-web-indol.vercel.app/",
      category: "Frontend",
    },
    {
      id: "project-4",
      title: "E-Commerce Platform",
      description: "Experience seamless furniture shopping with our full-stack eCommerce platform. Stylish, fast, and built for convenience!",
      image: furniture,
      mobileImage: "/placeholder.svg?height=400&width=200",
      tags: ["Next.js",  "Tailwind CSS" , "Sanity"],
      github: "https://github.com/Khalid-Seniordeveloper/INTERIOR-DESIGN",
      liveUrl: "https://interior-design-a67a.vercel.app/",
      category: "FullStack",
    },
    {
      id: "project-5",
      title: "Car E-Commerce App",
      description: "Discover the ultimate car shopping experience with our fully responsive Next.js-powered platform. Sleek, fast, and designed for perfection!",
      image: car,
      mobileImage: "/placeholder.svg?height=400&width=200",
      tags: ["React.js", "Talwind CSS"],
      github: "https://github.com/Khalid-Seniordeveloper/INTERIOR-DESIGN",
      liveUrl: "https://car-ecommerce-five.vercel.app/",
      category: "Frontend",
    },
 
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "frontend":
        return <Palette className="h-4 w-4 text-pink-400 dark:text-pink-600" />
      case "fullstack":
        return <Code className="h-4 w-4 text-purple-400 dark:text-purple-600" />
      case "design":
        return <Database className="h-4 w-4 text-indigo-400 dark:text-indigo-600" />
      default:
        return <Code className="h-4 w-4 text-purple-400 dark:text-purple-600" />
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-anton tracking-tight mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            MY{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700">
              PROJECTS
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-300 dark:text-gray-700 text-lg text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore my latest work. Each project represents a unique challenge and solution.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={fadeInUp} whileHover={{ y: -10 }} className="h-full">
                <Card className="border-none bg-slate-900/40 dark:bg-slate-200/40 backdrop-blur-sm border border-purple-500/10 dark:border-purple-600/10 hover:border-purple-500/50 dark:hover:border-purple-600/50 transition-all h-full overflow-hidden group">
                  <div className="relative aspect-video overflow-hidden project-image-container">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110 project-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between">
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-slate-800/80 dark:bg-slate-200/80 text-white dark:text-slate-900 hover:bg-purple-500/80 dark:hover:bg-purple-600/80 transition-colors"
                        aria-label="View GitHub repository"
                      >
                        <Github size={18} />
                      </Link>
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-slate-800/80 dark:bg-slate-200/80 text-white dark:text-slate-900 hover:bg-purple-500/80 dark:hover:bg-purple-600/80 transition-colors"
                        aria-label="View live project"
                      >
                        <ExternalLink size={18} />
                      </Link>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                      {getCategoryIcon(project.category)}
                      <Badge className="ml-2 bg-purple-500/10 dark:bg-purple-600/10 text-purple-400 dark:text-purple-600 border-none">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white dark:text-black">{project.title}</h3>
                    <p className="text-gray-300 dark:text-gray-700 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-slate-800/40 dark:bg-slate-200/40 text-gray-300 dark:text-gray-700 hover:bg-slate-700/50 dark:hover:bg-slate-300/50"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

