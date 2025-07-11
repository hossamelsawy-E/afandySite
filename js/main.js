// Main application logic
class AfandyTravelApp {
  constructor() {
    this.isLoading = true
    this.loadingProgress = 0
    this.currentLoadingStep = 0
    this.loadingDuration = 1000

    this.init()
  }

  init() {
    // Initialize language system
    window.initializeLanguage()

    // Start loading sequence
    this.startLoading()

  
    // Initialize animations when loading completes
    setTimeout(() => {
      this.completeLoading()
    }, this.loadingDuration)
  }

  startLoading() {
    const progressFill = document.getElementById("progress-fill")
    const progressText = document.getElementById("progress-text")
    const loadingStep = document.getElementById("loading-step")

    if (!progressFill || !progressText || !loadingStep) return

    const interval = setInterval(() => {
      this.loadingProgress += 100 / (this.loadingDuration / 50)

      // Update progress bar
      progressFill.style.width = `${this.loadingProgress}%`
      progressText.textContent = `${Math.round(this.loadingProgress)}%`

      // Update loading step
      const steps = window.loadingSteps[window.currentLanguage || "en"]
      const stepIndex = Math.floor((this.loadingProgress / 100) * steps.length)
      this.currentLoadingStep = Math.min(stepIndex, steps.length - 1)
      window.currentLoadingStep = this.currentLoadingStep

      if (steps[this.currentLoadingStep]) {
        loadingStep.textContent = steps[this.currentLoadingStep]
      }

      if (this.loadingProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          this.completeLoading()
        }, 500)
      }
    }, 50)
  }

  completeLoading() {
    const loadingScreen = document.getElementById("loading-screen")
    const mainWebsite = document.getElementById("main-website")

    if (loadingScreen && mainWebsite) {
      // Fade out loading screen
      loadingScreen.style.opacity = "0"
      loadingScreen.style.transition = "opacity 0.5s ease"

      setTimeout(() => {
        loadingScreen.style.display = "none"
        mainWebsite.classList.remove("hidden")
        mainWebsite.classList.add("visible")

        // Initialize all animations and interactions
        this.initializeWebsite()
      }, 500)
    }
  }

  initializeWebsite() {
    // Initialize animations
    window.initAnimations()

    // Initialize scroll-based animations with delay
    setTimeout(() => {
      this.initScrollAnimations()
    }, 100)

    // Initialize other features
    this.initFeatures()

    // Mark loading as complete
    this.isLoading = false
  }
  // slideshow
  // initHeroSlideshow() {
  //   const heroImages = document.querySelectorAll(".hero-bg-img");
  //   if (!heroImages.length) return;
  
  //   let currentIndex = 0;
  //   heroImages[0].classList.add("active");
  
  //   // Cleanup previous interval if exists
  //   if (this.heroInterval) clearInterval(this.heroInterval);
    
  //   this.heroInterval = setInterval(() => {
  //     heroImages.forEach(img => img.classList.remove("active"));
  //     currentIndex = (currentIndex + 1) % heroImages.length;
  //     heroImages[currentIndex].classList.add("active");
  //   }, 4000);
  
  //   // Improved parallax
  //   const updateParallax = () => {
  //     const activeImg = document.querySelector('.hero-bg-img.active');
  //     if (activeImg) {
  //       const parallax = window.pageYOffset * 0.3;
  //       activeImg.style.transform = `translateY(${parallax}px)`;
  //     }
  //     ticking = false;
  //   };
  
  //   // Rest of your parallax code...
  // }

  initFeatures() {
    // Initialize contact form
    this.initContactForm()

    // Initialize file upload
    this.initFileUpload()

    // Initialize mobile menu
    this.initMobileMenu()

    // Initialize floating chat
    this.initFloatingChat()

    // Initialize header effects
    this.initHeaderEffects()

    // Initialize testimonial effects
    this.initTestimonialEffects()

    // Initialize service card effects
    this.initServiceCardEffects()

    // Initialize blog card effects
    this.initBlogCardEffects()
  }

  initContactForm() {
    const form = document.getElementById("contact-form")
    if (!form) return

    form.addEventListener("submit", async (e) => {
      e.preventDefault()

      const submitBtn = form.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML

      // Show loading state
      submitBtn.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="width: 1.25rem; height: 1.25rem; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <span>Processing...</span>
                </div>
            `
      submitBtn.disabled = true

      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success message
      this.showNotification("Form submitted successfully! We will contact you soon.", "success")

      // Reset form
      form.reset()

      // Reset file upload display
      const fileUpload = document.querySelector(".file-upload")
      const uploadText = fileUpload?.querySelector(".file-upload-text")
      if (uploadText) {
        uploadText.innerHTML = `
                    <span class="upload-icon">📤</span>
                    <span>Click to upload or drag and drop</span>
                    <small>PDF, JPG, PNG up to 10MB</small>
                `
      }
      if (fileUpload) {
        fileUpload.style.borderColor = "var(--gray-300)"
        fileUpload.style.backgroundColor = "transparent"
      }

      // Restore button
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    })
  }

  initFileUpload() {
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
    ;["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      fileUpload.addEventListener(eventName, this.preventDefaults, false)
    })
    ;["dragenter", "dragover"].forEach((eventName) => {
      fileUpload.addEventListener(
        eventName,
        () => {
          fileUpload.style.borderColor = "var(--afandy-teal)"
          fileUpload.style.backgroundColor = "rgba(7, 124, 138, 0.05)"
        },
        false,
      )
    })
    ;["dragleave", "drop"].forEach((eventName) => {
      fileUpload.addEventListener(
        eventName,
        () => {
          fileUpload.style.borderColor = "var(--gray-300)"
          fileUpload.style.backgroundColor = "transparent"
        },
        false,
      )
    })

    fileUpload.addEventListener(
      "drop",
      (e) => {
        const files = e.dataTransfer.files
        if (files.length > 0) {
          fileInput.files = files
          fileInput.dispatchEvent(new Event("change"))
        }
      },
      false,
    )
  }

  preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  initMobileMenu() {
    const mobileNav = document.getElementById("mobile-nav")
    const menuToggle = document.querySelector(".mobile-menu-toggle")

    if (!mobileNav || !menuToggle) return

    // Close menu when clicking on nav links
    const navLinks = mobileNav.querySelectorAll(".nav-link-mobile")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active")
        menuToggle.classList.remove("active")
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      const isClickInsideNav = mobileNav.contains(e.target)
      const isClickOnToggle = menuToggle.contains(e.target)

      if (!isClickInsideNav && !isClickOnToggle && mobileNav.classList.contains("active")) {
        mobileNav.classList.remove("active")
        menuToggle.classList.remove("active")
      }
    })
  }

  initFloatingChat() {
    const chatOptions = document.getElementById("chat-options")

    // Close chat when clicking outside
    document.addEventListener("click", (e) => {
      const floatingChat = document.querySelector(".floating-chat")
      if (floatingChat && !floatingChat.contains(e.target) && chatOptions?.classList.contains("active")) {
        chatOptions.classList.remove("active")
        const chatToggle = document.querySelector(".chat-toggle")
        if (chatToggle) {
          chatToggle.innerHTML = '<span class="chat-toggle-icon">💬</span>'
        }
      }
    })
  }

  initHeaderEffects() {
    const header = document.querySelector(".header")
    if (!header) return

    let lastScrollY = window.scrollY
    let ticking = false

    const updateHeader = () => {
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
      ticking = false
    }

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader)
        ticking = true
      }
    }

    window.addEventListener("scroll", requestTick)
  }

  initTestimonialEffects() {
    const testimonialCards = document.querySelectorAll(".testimonial-card")

    testimonialCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        const stars = card.querySelector(".testimonial-stars")
        if (stars) {
          const starText = stars.textContent
          stars.innerHTML = ""
          ;[...starText].forEach((star, index) => {
            const span = document.createElement("span")
            span.textContent = star
            span.style.display = "inline-block"
            span.style.animation = `bounce 0.6s ease-in-out ${index * 0.1}s`
            stars.appendChild(span)
          })
        }
      })
    })
  }

  initServiceCardEffects() {
    const serviceCards = document.querySelectorAll(".service-card")

    serviceCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        const icon = card.querySelector(".service-icon .icon")
        if (icon) {
          icon.style.transform = "rotate(12deg) scale(1.1)"
          icon.style.transition = "transform 0.5s ease"
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

  initBlogCardEffects() {
    const blogCards = document.querySelectorAll(".blog-card")

    blogCards.forEach((card) => {
      // Add read time indicator
      const readTime = document.createElement("div")
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
                z-index: 10;
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

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div")
    notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === "success" ? "var(--afandy-teal)" : "var(--gray-800)"};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-xl);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 20rem;
        `

    if (document.documentElement.dir === "rtl") {
      notification.style.right = "auto"
      notification.style.left = "2rem"
      notification.style.transform = "translateX(-100%)"
    }

    notification.textContent = message
    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = document.documentElement.dir === "rtl" ? "translateX(-100%)" : "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 5000)
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.afandyApp = new AfandyTravelApp()
})

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause animations when page is hidden
    document.body.style.animationPlayState = "paused"
  } else {
    // Resume animations when page is visible
    document.body.style.animationPlayState = "running"
  }
})

// Handle resize events
window.addEventListener("resize", () => {
  // Recalculate animations on resize
  if (window.afandyApp && !window.afandyApp.isLoading) {
    // Reinitialize scroll animations if needed
    setTimeout(() => {
      window.afandyApp.initScrollAnimations()
    }, 100)
  }
})

// Export global functions
window.scrollToSection = (sectionId) => {
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

window.toggleMobileMenu = () => {
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

window.toggleChat = () => {
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

// Initialize carousel with custom interval bootstrap
// document.addEventListener('DOMContentLoaded', function() {
//   var myCarousel = new bootstrap.Carousel(document.getElementById('autoCarousel'), {
//     interval: 1000, // 1 second (1000ms)
//     wrap: true // Enable infinite looping
//   });
// });

// document.addEventListener('DOMContentLoaded', function() {
//   const flipBtn = document.getElementById('flip-btn');
//   const flipImage = document.getElementById('flip-image');
  
//   flipBtn.addEventListener('click', function() {
//       flipImage.classList.toggle('flipped');
//   });
// });

// window.addEventListener('scroll', function () {
//   const header = document.getElementById('header');
//   if (window.scrollY > 50) {
//     header.classList.add('scrolled');
//   } else {
//     header.classList.remove('scrolled');
//   }
// });
// document.addEventListener('DOMContentLoaded', () => {
//   const header = document.getElementById('header');
//   const navLinks = document.querySelectorAll('.nav-link');

//   window.addEventListener('scroll', () => {
//     if (window.scrollY > 50) {
//       header.classList.remove('bg-transparent', 'text-white');
//       header.classList.add('bg-white', 'text-black', 'shadow-md');

//       navLinks.forEach(link => {
//         // link.style.background = 'none';
//         // link.style.border = 'none';
//         link.style.color = '#000'; // black text
//         link.style.fontSize = '1rem';
//         link.style.fontWeight = '500';
//         link.style.cursor = 'pointer';
//         link.style.transition = '0.3s ease';
//         link.style.textDecoration = 'none';
//       });

//     } else {
//       header.classList.add('bg-transparent', 'text-white');
//       header.classList.remove('bg-white', 'text-black', 'shadow-md');

//       navLinks.forEach(link => {
//         // link.style.background = 'none';
//         // link.style.border = 'none';
//         link.style.color = '#fff'; // white text
//         link.style.fontSize = '1rem';
//         link.style.fontWeight = '500';
//         link.style.cursor = 'pointer';
//         link.style.transition = '0.3s ease';
//         link.style.textDecoration = 'none';
//       });
//     }
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.remove('bg-transparent', 'text-white');
      header.classList.add('bg-white', 'text-black', 'shadow-md');
      navLinks.forEach(link => link.style.color = '#000');
    } else {
      header.classList.add('bg-transparent', 'text-white');
      header.classList.remove('bg-white', 'text-black', 'shadow-md');
      navLinks.forEach(link => link.style.color = '#fff');
    }
  });
});


// Background Slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show selected slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    let newIndex = (currentSlide + 1) % slides.length;
    showSlide(newIndex);
}

// Change slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Click event for dots
dots.forEach(dot => {
    dot.addEventListener('click', function() {
        clearInterval(slideInterval);
        let slideIndex = parseInt(this.getAttribute('data-slide'));
        showSlide(slideIndex);
        // Restart auto-sliding
        slideInterval = setInterval(nextSlide, 5000);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Force reflow to trigger animations
document.querySelector('.hero').offsetHeight;