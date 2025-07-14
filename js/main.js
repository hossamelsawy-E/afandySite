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
  
    // initFloatingChat() {
    //   const chatOptions = document.getElementById("chat-options")
  
    //   // Close chat when clicking outside
    //   document.addEventListener("click", (e) => {
    //     const floatingChat = document.querySelector(".floating-chat")
    //     if (floatingChat && !floatingChat.contains(e.target) && chatOptions?.classList.contains("active")) {
    //       chatOptions.classList.remove("active")
    //       const chatToggle = document.querySelector(".chat-toggle")
    //       if (chatToggle) {
    //         chatToggle.innerHTML = '<span class="chat-toggle-icon">💬</span>'
    //       }
    //     }
    //   })
    // }
    
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
        chatToggle.innerHTML = '<span class="chat-toggle-icon"><dotlottie-wc src="https://lottie.host/30b351be-1bfe-49a3-a98b-0d44f02590cd/DTYpB5KzH8.lottie" style="width: 75px;height: 75px" speed="1" autoplay loop ></dotlottie-wc></span>'
      } else {
        chatOptions.classList.add("active")
        chatToggle.innerHTML = '<span class="chat-toggle-icon">✕</span>'
      }
    }
  }
  
  
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
  
   // Testimonial Carousel - Unique namespace
   const TestimonialCarouselModule = (function() {
    // Private variables - Updated with Google Drive links and thumbnails
    const testimonialData = [
        {
            id: 1,
            videoId: "1l5LHQftutG-zpg6Laa90R6Bmjy0-6mb8",
            thumbnail: "https://drive.google.com/thumbnail?id=1l5LHQftutG-zpg6Laa90R6Bmjy0-6mb8&sz=w400-h300"
        },
        {
            id: 2,
            videoId: "1x7vuxvWMgkTsOZGYjSZOI8mXxC-wh0Pm",
            thumbnail: "https://drive.google.com/thumbnail?id=1x7vuxvWMgkTsOZGYjSZOI8mXxC-wh0Pm&sz=w400-h300"
        },
        {
            id: 3,
            videoId: "1bxQnCmJaV8jiaJNGVywJhyRaFxCYztJo",
            thumbnail: "https://drive.google.com/thumbnail?id=1bxQnCmJaV8jiaJNGVywJhyRaFxCYztJo&sz=w400-h300"
        },
        {
            id: 4,
            videoId: "1Rsg2Ji-P_ueAV6EY4niMsdGnYLK9W1NV",
            thumbnail: "https://drive.google.com/thumbnail?id=1Rsg2Ji-P_ueAV6EY4niMsdGnYLK9W1NV&sz=w400-h300"
        },
        {
            id: 5,
            videoId: "18oyurVQ4kDb4GhBH-XV0BuyTlPYYqEUZ",
            thumbnail: "https://drive.google.com/thumbnail?id=18oyurVQ4kDb4GhBH-XV0BuyTlPYYqEUZ&sz=w400-h300"
        },
        {
            id: 6,
            videoId: "1UX4QnIi9h7DJtZ9ScN_4aAaHX1VNu7Fe",
            thumbnail: "https://drive.google.com/thumbnail?id=1UX4QnIi9h7DJtZ9ScN_4aAaHX1VNu7Fe&sz=w400-h300"
        },
    
    ];
  
    
    let currentSlideIndex = 0;
    let videoPlayingStates = {};
    let isDraggingCarousel = false;
    let dragStartX = 0;
    let dragCurrentX = 0;
    let autoSlideTimer;
  
    // DOM references
    const getCarouselSlider = () => document.getElementById('testimonialCarouselSlider');
    const getCarouselWrapper = () => document.getElementById('testimonialCarouselWrapper');
    const getCarouselPagination = () => document.getElementById('testimonialCarouselPagination');
  
    // Helper function to detect RTL
    function isRTL() {
        return document.documentElement.getAttribute('dir') === 'rtl';
    }
  
    // Convert Google Drive link to embed URL
    function getGoogleDriveEmbedUrl(fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  
    // Generate thumbnail URL from Google Drive file ID
    function getGoogleDriveThumbnailUrl(fileId, size = 'w400-h300') {
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`;
    }
  
    // Initialize carousel with resize handling
    function initTestimonialCarousel() {
        renderTestimonialSlides();
        renderTestimonialPagination();
        startTestimonialAutoSlide();
        setupTestimonialTouchEvents();
        
        // Handle window resize
        window.addEventListener('resize', debounce(() => {
            const wasAtEnd = currentSlideIndex === getMaxSlideIndex();
            
            renderTestimonialSlides();
            renderTestimonialPagination();
            
            // Adjust current slide if needed
            if (wasAtEnd) {
                currentSlideIndex = getMaxSlideIndex();
            } else {
                currentSlideIndex = Math.min(currentSlideIndex, getMaxSlideIndex());
            }
            
            updateTestimonialCarousel();
        }, 250));
    }
  
    // Helper function to get max slide index
    function getMaxSlideIndex() {
        const isMobile = window.innerWidth < 768;
        const videosPerPage = isMobile ? 1 : 3;
        return Math.ceil(testimonialData.length / videosPerPage) - 1;
    }
  
    // Debounce function for resize handling
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
  
    // Render slides with responsive layout
    function renderTestimonialSlides() {
        const slider = getCarouselSlider();
        slider.innerHTML = '';
  
        // Responsive videos per page
        const isMobile = window.innerWidth < 768;
        const videosPerPage = isMobile ? 1 : 3;
        const totalPages = Math.ceil(testimonialData.length / videosPerPage);
  
        for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
            const slide = document.createElement('div');
            slide.className = 'w-full flex-shrink-0 px-4';
  
            const grid = document.createElement('div');
            // Responsive grid: 1 column on mobile, 3 on desktop
            grid.className = 'grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto';
  
            for (let i = 0; i < videosPerPage; i++) {
                const dataIndex = pageIndex * videosPerPage + i;
                if (dataIndex < testimonialData.length) {
                    const testimonial = testimonialData[dataIndex];
                    const card = createTestimonialCard(testimonial, i);
                    grid.appendChild(card);
                }
            }
  
            slide.appendChild(grid);
            slider.appendChild(slide);
        }
  
        updateTestimonialCarousel();
    }
  
    // Create individual card with mobile optimization
    function createTestimonialCard(testimonial, cardIndex) {
        const card = document.createElement('div');
        // Remove hidden class for mobile responsiveness
        card.className = 'bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105';
  
        const embedUrl = getGoogleDriveEmbedUrl(testimonial.videoId);
  
        card.innerHTML = `
            <div class="relative testimonial-aspect-portrait bg-gray-100 overflow-hidden">
                <img
                    src="${testimonial.thumbnail || getGoogleDriveThumbnailUrl(testimonial.videoId)}"
                    alt="Testimonial video"
                    class="w-full h-full object-cover"
                    id="testimonialThumb-${testimonial.id}"
                    onerror="this.src='https://via.placeholder.com/400x600/6b7280/ffffff?text=Video+Thumbnail'"
                >
  
                <iframe
                    id="testimonialVideo-${testimonial.id}"
                    src=""
                    class="w-full h-full absolute inset-0 opacity-0 invisible transition-all duration-300"
                    frameborder="0"
                    allowfullscreen>
                </iframe>
  
                <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center video-overlay transition-all duration-300 hover:bg-opacity-40" id="testimonialPlayOverlay-${testimonial.id}">
                    <button class="bg-blue-600 hover:bg-blue-700 rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 shadow-lg group" onclick="testimonialTogglePlay(${testimonial.id})">
                        <svg class="w-6 h-6 md:w-8 md:h-8 text-white ml-0.5 md:ml-1 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                    <div class="absolute bottom-3 md:bottom-4 left-3 md:left-4 bg-black bg-opacity-70 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                        ▶ Play Video
                    </div>
                </div>
  
                <div class="absolute top-3 md:top-4 right-3 md:right-4 opacity-0 invisible transition-all duration-300 z-10" id="testimonialCloseBtn-${testimonial.id}">
                    <button class="bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full p-1.5 md:p-2 transition-all duration-300 group" onclick="testimonialTogglePlay(${testimonial.id})">
                        <svg class="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
  
        return card;
    }
  
    // Render pagination dots with responsive calculation
    function renderTestimonialPagination() {
        const pagination = getCarouselPagination();
        pagination.innerHTML = '';
  
        const isMobile = window.innerWidth < 768;
        const videosPerPage = isMobile ? 1 : 3;
        const totalPages = Math.ceil(testimonialData.length / videosPerPage);
  
        for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
            const dot = document.createElement('button');
            dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${
                pageIndex === currentSlideIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
            }`;
            dot.onclick = () => goToTestimonialSlide(pageIndex);
            pagination.appendChild(dot);
        }
    }
  
    // RTL-compatible update function
    function updateTestimonialCarousel() {
        const slider = getCarouselSlider();
        
        // Always use negative translateX regardless of RTL
        // The CSS forces LTR direction for the carousel
        const translateX = -currentSlideIndex * 100;
        slider.style.transform = `translateX(${translateX}%)`;
  
        // Update pagination
        const dots = getCarouselPagination().children;
        Array.from(dots).forEach((dot, index) => {
            dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlideIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
            }`;
        });
    }
  
    // Navigation functions with responsive handling
    function nextTestimonialSlide() {
        Object.keys(videoPlayingStates).forEach(videoId => {
            if (videoPlayingStates[videoId]) {
                toggleTestimonialPlay(parseInt(videoId));
            }
        });
  
        const isMobile = window.innerWidth < 768;
        const videosPerPage = isMobile ? 1 : 3;
        const totalPages = Math.ceil(testimonialData.length / videosPerPage);
        currentSlideIndex = (currentSlideIndex + 1) % totalPages;
        updateTestimonialCarousel();
    }
  
    function prevTestimonialSlide() {
        Object.keys(videoPlayingStates).forEach(videoId => {
            if (videoPlayingStates[videoId]) {
                toggleTestimonialPlay(parseInt(videoId));
            }
        });
  
        const isMobile = window.innerWidth < 768;
        const videosPerPage = isMobile ? 1 : 3;
        const totalPages = Math.ceil(testimonialData.length / videosPerPage);
        currentSlideIndex = (currentSlideIndex - 1 + totalPages) % totalPages;
        updateTestimonialCarousel();
    }
  
    function goToTestimonialSlide(index) {
        Object.keys(videoPlayingStates).forEach(videoId => {
            if (videoPlayingStates[videoId]) {
                toggleTestimonialPlay(parseInt(videoId));
            }
        });
  
        currentSlideIndex = index;
        updateTestimonialCarousel();
    }
  
    // Toggle video play
    function toggleTestimonialPlay(id) {
        const videoElement = document.getElementById(`testimonialVideo-${id}`);
        const thumbElement = document.getElementById(`testimonialThumb-${id}`);
        const playOverlay = document.getElementById(`testimonialPlayOverlay-${id}`);
        const closeBtn = document.getElementById(`testimonialCloseBtn-${id}`);
        const testimonial = testimonialData.find(t => t.id === id);
  
        const isCurrentlyPlaying = videoPlayingStates[id];
  
        Object.keys(videoPlayingStates).forEach(videoId => {
            if (videoId != id && videoPlayingStates[videoId]) {
                const otherVideo = document.getElementById(`testimonialVideo-${videoId}`);
                const otherThumb = document.getElementById(`testimonialThumb-${videoId}`);
                const otherOverlay = document.getElementById(`testimonialPlayOverlay-${videoId}`);
                const otherCloseBtn = document.getElementById(`testimonialCloseBtn-${videoId}`);
  
                videoPlayingStates[videoId] = false;
                otherVideo.src = '';
                otherVideo.classList.add('opacity-0', 'invisible');
                otherThumb.classList.remove('opacity-0', 'invisible');
                otherOverlay.classList.remove('opacity-0', 'invisible');
                otherCloseBtn.classList.add('opacity-0', 'invisible');
            }
        });
  
        if (isCurrentlyPlaying) {
            videoPlayingStates[id] = false;
            videoElement.src = '';
            videoElement.classList.add('opacity-0', 'invisible');
            thumbElement.classList.remove('opacity-0', 'invisible');
            playOverlay.classList.remove('opacity-0', 'invisible');
            closeBtn.classList.add('opacity-0', 'invisible');
        } else {
            videoPlayingStates[id] = true;
            videoElement.src = getGoogleDriveEmbedUrl(testimonial.videoId);
            videoElement.classList.remove('opacity-0', 'invisible');
            thumbElement.classList.add('opacity-0', 'invisible');
            playOverlay.classList.add('opacity-0', 'invisible');
            closeBtn.classList.remove('opacity-0', 'invisible');
        }
    }
  
    // Auto-slide functionality
    function startTestimonialAutoSlide() {
        autoSlideTimer = setInterval(() => {
            const anyVideoPlaying = Object.values(videoPlayingStates).some(playing => playing);
            if (!anyVideoPlaying) {
                nextTestimonialSlide();
            }
        }, 6000);
    }
  
    function stopTestimonialAutoSlide() {
        clearInterval(autoSlideTimer);
    }
  
    function restartTestimonialAutoSlide() {
        stopTestimonialAutoSlide();
        setTimeout(startTestimonialAutoSlide);
    }
  
    // RTL-compatible touch and drag events
    function setupTestimonialTouchEvents() {
        const wrapper = getCarouselWrapper();
  
        wrapper.addEventListener('mousedown', handleTestimonialStart);
        wrapper.addEventListener('mousemove', handleTestimonialMove);
        wrapper.addEventListener('mouseup', handleTestimonialEnd);
        wrapper.addEventListener('mouseleave', handleTestimonialEnd);
  
        wrapper.addEventListener('touchstart', handleTestimonialStart);
        wrapper.addEventListener('touchmove', handleTestimonialMove);
        wrapper.addEventListener('touchend', handleTestimonialEnd);
  
        wrapper.addEventListener('mouseenter', stopTestimonialAutoSlide);
        wrapper.addEventListener('mouseleave', restartTestimonialAutoSlide);
    }
  
    function handleTestimonialStart(e) {
        isDraggingCarousel = true;
        dragStartX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        dragCurrentX = dragStartX;
  
        const wrapper = getCarouselWrapper();
        wrapper.classList.remove('testimonial-carousel-grab');
        wrapper.classList.add('testimonial-carousel-grabbing');
  
        stopTestimonialAutoSlide();
    }
  
    function handleTestimonialMove(e) {
        if (!isDraggingCarousel) return;
  
        e.preventDefault();
        dragCurrentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
  
        const diffX = dragCurrentX - dragStartX;
        const slider = getCarouselSlider();
  
        const resistance = 0.3;
        const offset = diffX * resistance;
  
        // Always use the same calculation regardless of RTL
        // since we force LTR direction on the carousel
        slider.style.transform = `translateX(calc(-${currentSlideIndex * 100}% + ${offset}px))`;
    }
  
    function handleTestimonialEnd(e) {
        if (!isDraggingCarousel) return;
  
        isDraggingCarousel = false;
        const wrapper = getCarouselWrapper();
        wrapper.classList.remove('testimonial-carousel-grabbing');
        wrapper.classList.add('testimonial-carousel-grab');
  
        const diffX = dragCurrentX - dragStartX;
        const threshold = 100;
  
        if (Math.abs(diffX) > threshold) {
            // Standard swipe logic - same for RTL and LTR
            if (diffX > 0) {
                prevTestimonialSlide();
            } else {
                nextTestimonialSlide();
            }
        } else {
            updateTestimonialCarousel();
        }
  
        restartTestimonialAutoSlide();
    }
  
    // Public API
    return {
        init: initTestimonialCarousel,
        next: nextTestimonialSlide,
        prev: prevTestimonialSlide,
        goTo: goToTestimonialSlide,
        togglePlay: toggleTestimonialPlay
    };
  })();
  
  // Global functions for onclick handlers
  function testimonialCarouselNext() {
    TestimonialCarouselModule.next();
  }
  
  function testimonialCarouselPrev() {
    TestimonialCarouselModule.prev();
  }
  
  function testimonialTogglePlay(id) {
    TestimonialCarouselModule.togglePlay(id);
  }
  
  // Initialize when page loads
  document.addEventListener('DOMContentLoaded', function() {
    TestimonialCarouselModule.init();
  });
  
  
  // دالة عرض الصور
  function ardSura(raqamSura) {
    const sura = document.getElementById(`sura-${raqamSura === 1 ? 'ula' : raqamSura === 2 ? 'thaniat' : 'thalithat'}`);
    sura.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        sura.style.transform = 'scale(1)';
    }, 300);
  }
  
  // دالة مراقبة التمرير للرسوم المتحركة
  function muraqabatTamarrur() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('zahir');
                
                // إضافة تأخير للعناصر المتتالية
                if (entry.target.classList.contains('unsur-qaemat')) {
                    const items = document.querySelectorAll('.unsur-qaemat');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('zahir');
                        }, index * 150);
                    });
                }
                
                // إضافة تأخير للصور
                if (entry.target.classList.contains('sura-taefat')) {
                    const images = document.querySelectorAll('.sura-taefat');
                    images.forEach((img, index) => {
                        setTimeout(() => {
                            img.classList.add('zahir');
                        }, index * 200);
                    });
                }
                
                // إضافة تأخير للنصوص
                if (entry.target.classList.contains('nass-asaesi')) {
                    const texts = document.querySelectorAll('.nass-asaesi');
                    texts.forEach((text, index) => {
                        setTimeout(() => {
                            text.classList.add('zahir');
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
  
    // مراقبة جميع العناصر
    const elements = document.querySelectorAll(`
        .muhtawa-alsafar, 
        .suar-alsafar, 
        .unwan-raeesi, 
        .unwan-fariei, 
        .nass-asaesi, 
        .unsur-qaemat, 
        .zur-alaitseal, 
        .sura-taefat
    `);
    
    elements.forEach(el => observer.observe(el));
  }
  
  // دالة تحسين الأداء للجوال
  function tahsienAdaJawal() {
    const images = document.querySelectorAll('.sura-taefat');
    if (window.innerWidth < 768) {
        images.forEach(img => {
            img.style.willChange = 'transform';
        });
    }
  }
  
  // دالة تحريك العناصر بناءً على السرعة (معطلة على الجوال)
  function tahriktBiHasabSura() {
    if (window.innerWidth > 992) {
        let ticking = false;
        
        function updateAnimations() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            document.querySelectorAll('.sura-taefat').forEach((img, index) => {
                const speed = (index + 1) * 0.3;
                img.style.transform = `translateY(${rate * speed}px)`;
            });
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
  }
  
  // تشغيل الدوال عند تحميل الصفحة
  window.addEventListener('load', () => {
    muraqabatTamarrur();
    tahsienAdaJawal();
    tahriktBiHasabSura();
  });
  
  // تحسين الأداء عند تغيير حجم الشاشة
  window.addEventListener('resize', tahsienAdaJawal);
  
  // إضافة تأثيرات الماوس للحاسوب فقط
  if (!('ontouchstart' in window) && window.innerWidth > 992) {
    document.addEventListener('mousemove', (e) => {
        const images = document.querySelectorAll('.sura-taefat');
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
  }
  
  initFloatingChat()
    // Ensure DOM is ready
    const setupClickHandler = () => {
      const chatOptions = document.getElementById("chat-options")
      
      // Remove any existing listeners to prevent duplicates
      document.removeEventListener("click", this.handleOutsideClick)
      
      // Store the handler as a class method so we can remove it later
      this.handleOutsideClick = (e) => {
        const floatingChat = document.querySelector(".floating-chat")
        const chatToggle = document.querySelector(".chat-toggle")
        
        // Debug logging (remove in production)
        console.log('Click detected:', {
          target: e.target,
          floatingChat: !!floatingChat,
          chatOptions: !!chatOptions,
          isActive: chatOptions?.classList.contains("active"),
          containsTarget: floatingChat?.contains(e.target)
        })
        
        // Check if elements exist and click is outside
        if (floatingChat && 
            !floatingChat.contains(e.target) && 
            chatOptions?.classList.contains("active")) {
          
          chatOptions.classList.remove("active")
          
          if (chatToggle) {
            chatToggle.innerHTML = '<span class="chat-toggle-icon"><dotlottie-wc src="https://lottie.host/30b351be-1bfe-49a3-a98b-0d44f02590cd/DTYpB5KzH8.lottie" style="width: 75px;height: 75px" speed="1" autoplay loop ></dotlottie-wc></span>'
          }
        }
      }
      
      // Add the event listener
      document.addEventListener("click", this.handleOutsideClick)
    }
    
    // Setup immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupClickHandler)
    } else {
      setupClickHandler()
    }
    
    // Also setup after a small delay to handle dynamic content
    setTimeout(setupClickHandler, 100)
  