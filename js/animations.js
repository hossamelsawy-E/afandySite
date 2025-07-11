// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target
      const delay = element.getAttribute("data-delay") || 0

      setTimeout(() => {
        element.classList.add("animate")
      }, Number.parseInt(delay))

      // Only trigger once
      observer.unobserve(element)
    }
  })
}, observerOptions)

// Initialize scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll("[data-animate]")
  animatedElements.forEach((element) => {
    element.classList.add("animate-on-scroll")
    observer.observe(element)
  })
}

// Parallax effect for hero background
function initParallax() {
  const heroSection = document.getElementById("hero")
  const heroBg = heroSection?.querySelector(".hero-bg-img")

  if (!heroBg) return

  function updateParallax() {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5
    heroBg.style.transform = `translate3d(0, ${rate}px, 0) scale(1.05)`
  }

  // Throttle scroll events for performance
  let ticking = false
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  }

  window.addEventListener("scroll", () => {
    requestTick()
    ticking = false
  })
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = document.querySelector(".header")?.offsetHeight || 0
    const targetPosition = element.offsetTop - headerHeight

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })
  }
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector(".header")
  if (!header) return

  let lastScrollY = window.scrollY

  function updateHeader() {
    const currentScrollY = window.scrollY

    if (currentScrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)"
      header.style.backdropFilter = "blur(20px)"
      header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.backdropFilter = "blur(10px)"
      header.style.boxShadow = "none"
    }

    lastScrollY = currentScrollY
  }

  window.addEventListener("scroll", updateHeader)
}

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobile-nav")
  const menuToggle = document.querySelector(".mobile-menu-toggle")

  if (mobileNav && menuToggle) {
    const isActive = mobileNav.classList.contains("active")

    if (isActive) {
      mobileNav.classList.remove("active")
      menuToggle.classList.remove("active")
    } else {
      mobileNav.classList.add("active")
      menuToggle.classList.add("active")
    }
  }
}

// Close mobile menu when clicking outside
function initMobileMenuClose() {
  document.addEventListener("click", (e) => {
    const mobileNav = document.getElementById("mobile-nav")
    const menuToggle = document.querySelector(".mobile-menu-toggle")

    if (mobileNav && menuToggle) {
      const isClickInsideNav = mobileNav.contains(e.target)
      const isClickOnToggle = menuToggle.contains(e.target)

      if (!isClickInsideNav && !isClickOnToggle && mobileNav.classList.contains("active")) {
        mobileNav.classList.remove("active")
        menuToggle.classList.remove("active")
      }
    }
  })
}

// Floating chat toggle
function toggleChat() {
  const chatOptions = document.getElementById("chat-options")
  const chatToggle = document.querySelector(".chat-toggle")

  if (chatOptions && chatToggle) {
    const isActive = chatOptions.classList.contains("active")

    if (isActive) {
      chatOptions.classList.remove("active")
      chatToggle.innerHTML = '<span class="chat-toggle-icon">💬</span>'
    } else {
      chatOptions.classList.add("active")
      chatToggle.innerHTML = '<span class="chat-toggle-icon">✕</span>'
    }
  }
}

// Form submission handling
function initContactForm() {
  const form = document.getElementById("contact-form")
  if (!form) return

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const submitBtn = form.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    // Show loading state
    submitBtn.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div class="loading-spinner" style="width: 1.25rem; height: 1.25rem; border-width: 2px;"></div>
                Processing...
            </div>
        `
    submitBtn.disabled = true

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Show success message
    alert("Form submitted successfully! We will contact you soon.")

    // Reset form
    form.reset()

    // Restore button
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
  })
}

// File upload handling
function initFileUpload() {
  const fileInput = document.getElementById("passport")
  const fileUpload = document.querySelector(".file-upload")

  if (!fileInput || !fileUpload) return

  fileUpload.addEventListener("click", () => {
    fileInput.click()
  })

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0]
    const uploadText = fileUpload.querySelector(".file-upload-text")

    if (file) {
      uploadText.innerHTML = `
                <span class="upload-icon">✅</span>
                <span>Selected: ${file.name}</span>
                <small>Click to change file</small>
            `
      fileUpload.style.borderColor = "var(--afandy-teal)"
      fileUpload.style.backgroundColor = "rgba(7, 124, 138, 0.05)"
    }
  })

  // Drag and drop functionality
  fileUpload.addEventListener("dragover", (e) => {
    e.preventDefault()
    fileUpload.style.borderColor = "var(--afandy-teal)"
    fileUpload.style.backgroundColor = "rgba(7, 124, 138, 0.05)"
  })

  fileUpload.addEventListener("dragleave", (e) => {
    e.preventDefault()
    fileUpload.style.borderColor = "var(--gray-300)"
    fileUpload.style.backgroundColor = "transparent"
  })

  fileUpload.addEventListener("drop", (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      fileInput.files = files
      fileInput.dispatchEvent(new Event("change"))
    }
    fileUpload.style.borderColor = "var(--gray-300)"
    fileUpload.style.backgroundColor = "transparent"
  })
}

// Testimonial star animation
function initTestimonialStars() {
  const testimonialCards = document.querySelectorAll(".testimonial-card")

  testimonialCards.forEach((card) => {
    const stars = card.querySelector(".testimonial-stars")
    if (!stars) return

    card.addEventListener("mouseenter", () => {
      const starElements = stars.textContent.split("")
      stars.innerHTML = ""

      starElements.forEach((star, index) => {
        const span = document.createElement("span")
        span.textContent = star
        span.style.display = "inline-block"
        span.style.animation = `bounce 0.6s ease-in-out ${index * 0.1}s`
        stars.appendChild(span)
      })
    })
  })
}

// Service card hover effects
function initServiceCards() {
  const serviceCards = document.querySelectorAll(".service-card")

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const icon = card.querySelector(".service-icon .icon")
      if (icon) {
        icon.style.transform = "rotate(12deg) scale(1.1)"
      }
    })

    card.addEventListener("mouseleave", () => {
      const icon = card.querySelector(".service-icon .icon")
      if (icon) {
        icon.style.transform = "rotate(0deg) scale(1)"
      }
    })
  })
}

// Process step connection lines
function initProcessConnections() {
  const processSteps = document.querySelectorAll(".process-step")

  processSteps.forEach((step, index) => {
    if (index < processSteps.length - 1) {
      const line = document.createElement("div")
      line.className = "process-connection-line"
      line.style.cssText = `
                position: absolute;
                top: 50%;
                right: -1rem;
                width: 2rem;
                height: 2px;
                background: linear-gradient(90deg, var(--afandy-teal), var(--afandy-blue));
                transform: translateY(-50%) scaleX(0);
                transition: transform 0.8s ease;
                transform-origin: left;
                z-index: 5;
            `

      if (document.documentElement.dir === "rtl") {
        line.style.right = "auto"
        line.style.left = "-1rem"
        line.style.transformOrigin = "right"
      }

      step.style.position = "relative"
      step.appendChild(line)

      // Animate line when step comes into view
      const stepObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                line.style.transform = "translateY(-50%) scaleX(1)"
              }, 600)
              stepObserver.unobserve(step)
            }
          })
        },
        { threshold: 0.5 },
      )

      stepObserver.observe(step)
    }
  })
}

// Blog card hover effects
function initBlogCards() {
  const blogCards = document.querySelectorAll(".blog-card")

  blogCards.forEach((card) => {
    const readTime = document.createElement("div")
    readTime.className = "blog-read-time"
    readTime.innerHTML = "👁️ 5 min"
    readTime.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            padding: 0.25rem 0.5rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            color: var(--gray-700);
            opacity: 0;
            transition: opacity 0.3s ease;
        `

    if (document.documentElement.dir === "rtl") {
      readTime.style.right = "auto"
      readTime.style.left = "1rem"
    }

    const blogImage = card.querySelector(".blog-image")
    if (blogImage) {
      blogImage.style.position = "relative"
      blogImage.appendChild(readTime)
    }

    card.addEventListener("mouseenter", () => {
      readTime.style.opacity = "1"
    })

    card.addEventListener("mouseleave", () => {
      readTime.style.opacity = "0"
    })
  })
}

// Initialize all animations
function initAnimations() {
  initScrollAnimations()
  initParallax()
  initHeaderScroll()
  initMobileMenuClose()
  initContactForm()
  initFileUpload()
  initTestimonialStars()
  initServiceCards()
  initProcessConnections()
  initBlogCards()
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Export functions for global use
window.scrollToSection = scrollToSection
window.toggleMobileMenu = toggleMobileMenu
window.toggleChat = toggleChat
window.initAnimations = initAnimations
