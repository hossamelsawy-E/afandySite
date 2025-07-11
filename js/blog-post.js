// Blog Post JavaScript
class BlogPost {
  constructor() {
    this.currentLanguage = localStorage.getItem("language") || "en"
    this.postId = this.getPostIdFromUrl()
    this.post = null
    this.init()
  }

  init() {
    this.loadPost()
    this.setupEventListeners()
    this.updateLanguageDisplay()
  }

  getPostIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search)
    return Number.parseInt(urlParams.get("id")) || 1
  }

  loadPost() {
    // Assuming blogData is available globally or imported
    // if (typeof blogData === "undefined") {
    //   console.error("blogData is not defined. Make sure it is loaded.")
    //   return
    // }
    if (!window.blogPosts || !Array.isArray(window.blogPosts)) {
      console.error("Blog posts data is not available")
      this.showNotFound()
      return
    }
    this.post = window.blogPosts.find((post) => post.id === this.postId)

    if (!this.post) {
      this.showNotFound()
      return
    }

    this.renderPost()
  }

  showNotFound() {
    document.getElementById("main-content").innerHTML = `
      <div class="container mx-auto px-4 py-20 text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">
          ${this.currentLanguage === "ar" ? "المقال غير موجود" : "Post Not Found"}
        </h1>
        <a href="blog.html" class="btn btn-primary">
          ${this.currentLanguage === "ar" ? "العودة للمدونة" : "Back to Blog"}
        </a>
      </div>
    `
  }

  renderPost() {
    // Hide loading state
    const loadingState = document.getElementById("loading-state")
    if (loadingState) loadingState.style.display = "none"
    
    // Show content
    const content = document.getElementById("blog-post-content")
    if (content) content.style.display = "block"
    // const content = document.getElementById("main-content")
    const isRTL = this.currentLanguage === "ar"

    content.innerHTML = `
      <!-- Hero Section -->
      <section class="blog-post-hero">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <!-- Back Button -->
            <a href="blog.html" class="btn btn-outline mb-6 ${isRTL ? "flex-row-reverse" : ""}">
              <i class="fas fa-arrow-left ${isRTL ? "ml-2 rotate-180" : "mr-2"}"></i>
              ${this.currentLanguage === "ar" ? "العودة للمدونة" : "Back to Blog"}
            </a>

            <!-- Category Badge -->
            <div class="${isRTL ? "text-right" : "text-left"} mb-4">
              <span class="badge badge-primary">
                ${this.post.category[this.currentLanguage]}
              </span>
            </div>

            <!-- Title -->
            <h1 class="text-3xl md:text-5xl font-bold text-white mb-6 ${isRTL ? "text-right" : "text-left"}">
              ${this.post.title[this.currentLanguage]}
            </h1>

            <!-- Meta Information -->
            <div class="flex flex-wrap items-center gap-6 text-gray-300 mb-8 ${isRTL ? "flex-row-reverse justify-end" : "justify-start"}">
              <div class="flex items-center ${isRTL ? "flex-row-reverse" : ""}">
                <img src="${this.post.authorImage || "/placeholder.svg"}" alt="${this.post.author[this.currentLanguage]}" 
                     class="w-10 h-10 rounded-full object-cover ${isRTL ? "ml-3" : "mr-3"}">
                <span class="font-medium">${this.post.author[this.currentLanguage]}</span>
              </div>
              <div class="flex items-center ${isRTL ? "flex-row-reverse" : ""}">
                <i class="fas fa-calendar ${isRTL ? "ml-2" : "mr-2"}"></i>
                ${this.formatDate(this.post.date)}
              </div>
              <div class="flex items-center ${isRTL ? "flex-row-reverse" : ""}">
                <i class="fas fa-clock ${isRTL ? "ml-2" : "mr-2"}"></i>
                ${this.post.readTime}
              </div>
            </div>

            <!-- Featured Image -->
            <div class="relative overflow-hidden rounded-lg mb-8">
              <img src="${this.post.image || "/placeholder.svg"}" alt="${this.post.title[this.currentLanguage]}" 
                   class="w-full h-64 md:h-96 object-cover">
            </div>
          </div>
        </div>
      </section>

      <!-- Content Section -->
      <section class="py-12">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <!-- Main Content -->
              <div class="lg:col-span-3">
                <div class="card shadow-lg">
                  <div class="card-body p-8">
                    <div class="blog-post-content ${isRTL ? "rtl" : ""}">
                      ${this.formatContent(this.post.content[this.currentLanguage])}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Sidebar -->
              <div class="lg:col-span-1">
                <div class="blog-post-sidebar">
                  <!-- Share Section -->
                  <div class="card shadow-lg mb-6">
                    <div class="card-body p-6">
                      <h3 class="text-lg font-bold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}">
                        ${this.currentLanguage === "ar" ? "شارك المقال" : "Share Article"}
                      </h3>
                      <div class="share-buttons">
                        <a href="#" class="share-button facebook" onclick="blogPost.shareOnFacebook()">
                          <i class="fab fa-facebook ${isRTL ? "ml-2" : "mr-2"}"></i>
                          Facebook
                        </a>
                        <a href="#" class="share-button twitter" onclick="blogPost.shareOnTwitter()">
                          <i class="fab fa-twitter ${isRTL ? "ml-2" : "mr-2"}"></i>
                          Twitter
                        </a>
                        <a href="#" class="share-button linkedin" onclick="blogPost.shareOnLinkedIn()">
                          <i class="fab fa-linkedin ${isRTL ? "ml-2" : "mr-2"}"></i>
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>

                  <!-- Tags -->
                  <div class="card shadow-lg">
                    <div class="card-body p-6">
                      <h3 class="text-lg font-bold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}">
                        ${this.currentLanguage === "ar" ? "العلامات" : "Tags"}
                      </h3>
                      <div class="tags-container ${isRTL ? "justify-end" : "justify-start"}">
                        ${this.post.tags
                          .map(
                            (tag) => `
                          <span class="tag">#${tag}</span>
                        `,
                          )
                          .join("")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  }

  formatContent(content) {
    return content
      .split("\n")
      .map((paragraph) => {
        if (paragraph.startsWith("##")) {
          return `<h2>${paragraph.replace("## ", "")}</h2>`
        } else if (paragraph.startsWith("###")) {
          return `<h3>${paragraph.replace("### ", "")}</h3>`
        } else if (paragraph.startsWith("- ")) {
          return `<li>${paragraph.replace("- ", "")}</li>`
        } else if (paragraph.match(/^\d+\./)) {
          return `<li>${paragraph.replace(/^\d+\.\s*/, "")}</li>`
        } else if (paragraph.trim()) {
          return `<p>${paragraph}</p>`
        }
        return ""
      })
      .join("")
  }

  formatDate(dateString) {
    const date = new Date(dateString)
    const options = { year: "numeric", month: "long", day: "numeric" }
    const locale = this.currentLanguage === "ar" ? "ar-SA" : "en-US"
    return date.toLocaleDateString(locale, options)
  }

  setupEventListeners() {
    // Language toggle
    const languageToggle = document.getElementById("language-toggle")
    if (languageToggle) {
      languageToggle.addEventListener("click", () => {
        this.toggleLanguage()
      })
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
    const mobileMenu = document.getElementById("mobile-menu")
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden")
      })
    }
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === "en" ? "ar" : "en"
    localStorage.setItem("language", this.currentLanguage)
    this.updateLanguageDisplay()
    this.renderPost()
  }

  updateLanguageDisplay() {
    document.documentElement.dir = this.currentLanguage === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = this.currentLanguage
    document.body.className = "scrollbar-right"

    // Update language toggle button
    const languageToggle = document.getElementById("language-toggle")
    if (languageToggle) {
      languageToggle.textContent = this.currentLanguage === "en" ? "العربية" : "English"
    }

    // Update navigation
    this.updateNavigation()
  }

  updateNavigation() {
    const navItems = {
      "nav-home": this.currentLanguage === "ar" ? "الرئيسية" : "Home",
      "nav-services": this.currentLanguage === "ar" ? "الخدمات" : "Services",
      "nav-process": this.currentLanguage === "ar" ? "العملية" : "Process",
      "nav-contact": this.currentLanguage === "ar" ? "اتصل بنا" : "Contact",
      "nav-blog": this.currentLanguage === "ar" ? "المدونة" : "Blog",
    }

    Object.entries(navItems).forEach(([id, text]) => {
      const element = document.getElementById(id)
      if (element) {
        element.textContent = text
      }
    })
  }

  shareOnFacebook() {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
  }

  shareOnTwitter() {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(this.post.title[this.currentLanguage])
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank")
  }

  shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank")
  }
}

// Initialize blog post when DOM is loaded
let blogPost
document.addEventListener("DOMContentLoaded", () => {
  blogPost = new BlogPost()
})
