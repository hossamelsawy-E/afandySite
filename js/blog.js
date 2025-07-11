// Blog page functionality
class BlogManager {
  constructor() {
    this.posts = window.blogPosts || []
    this.filteredPosts = [...this.posts]
    this.currentPage = 1
    this.postsPerPage = 4
    this.currentCategory = "all"
    this.currentSearch = ""
    this.currentLanguage = window.currentLanguage || "en"

    this.init()
  }

  init() {
    this.initializeLanguage()
    this.renderPosts()
    this.initEventListeners()
    this.updateResultsCount()
  }

  initializeLanguage() {
    // Initialize language from global state
    window.initializeLanguage()
    this.currentLanguage = window.currentLanguage || "en"
  }

  initEventListeners() {
    // Search input
    const searchInput = document.getElementById("search-input")
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.handleSearch(e.target.value)
      })

      // Update placeholder based on language
      this.updateSearchPlaceholder()
    }

    // Category filters
    const filterBtns = document.querySelectorAll(".filter-btn")
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.handleCategoryFilter(e.target.dataset.category)
        this.updateActiveFilter(e.target)
      })
    })

    // Language change listener
    document.addEventListener("languageChanged", () => {
      this.currentLanguage = window.currentLanguage || "en"
      this.renderPosts()
      this.updateResultsCount()
      this.updateSearchPlaceholder()
      this.updateCategoryFilters()
    })
  }

  updateSearchPlaceholder() {
    const searchInput = document.getElementById("search-input")
    if (searchInput) {
      searchInput.placeholder = this.currentLanguage === "ar" ? "البحث في المقالات..." : "Search articles..."
    }
  }

  updateCategoryFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn")
    const categoryTranslations = {
      all: this.currentLanguage === "ar" ? "جميع الفئات" : "All Categories",
      "visa-news": this.currentLanguage === "ar" ? "أخبار التأشيرات" : "Visa News",
      education: this.currentLanguage === "ar" ? "التعليم" : "Education",
      work: this.currentLanguage === "ar" ? "العمل" : "Work",
      travel: this.currentLanguage === "ar" ? "السفر" : "Travel",
      immigration: this.currentLanguage === "ar" ? "الهجرة" : "Immigration",
    }

    filterBtns.forEach((btn) => {
      const category = btn.dataset.category
      if (categoryTranslations[category]) {
        btn.textContent = categoryTranslations[category]
      }
    })
  }

  handleSearch(searchTerm) {
    this.currentSearch = searchTerm.toLowerCase()
    this.currentPage = 1
    this.filterPosts()
  }

  handleCategoryFilter(category) {
    this.currentCategory = category
    this.currentPage = 1
    this.filterPosts()
  }

  updateActiveFilter(activeBtn) {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active")
    })
    activeBtn.classList.add("active")
  }

  filterPosts() {
    this.filteredPosts = this.posts.filter((post) => {
      const matchesSearch =
        this.currentSearch === "" ||
        post.title[this.currentLanguage].toLowerCase().includes(this.currentSearch) ||
        post.excerpt[this.currentLanguage].toLowerCase().includes(this.currentSearch) ||
        post.tags.some((tag) => tag.toLowerCase().includes(this.currentSearch))

      const matchesCategory = this.currentCategory === "all" || post.categorySlug === this.currentCategory

      return matchesSearch && matchesCategory
    })

    this.renderPosts()
    this.updateResultsCount()
  }

  renderPosts() {
    const blogGrid = document.getElementById("blog-grid")
    const noResults = document.getElementById("no-results")

    if (!blogGrid) return

    if (this.filteredPosts.length === 0) {
      blogGrid.style.display = "none"
      if (noResults) {
        noResults.style.display = "block"
        this.updateNoResultsText()
      }
      this.hidePagination()
      return
    }

    blogGrid.style.display = "grid"
    if (noResults) noResults.style.display = "none"

    const startIndex = (this.currentPage - 1) * this.postsPerPage
    const endIndex = startIndex + this.postsPerPage
    const postsToShow = this.filteredPosts.slice(startIndex, endIndex)

    blogGrid.innerHTML = ""

    postsToShow.forEach((post, index) => {
      const postElement = this.createPostElement(post, index)
      blogGrid.appendChild(postElement)
    })

    this.renderPagination()
    this.initScrollAnimations()
  }

  createPostElement(post, index) {
    const article = document.createElement("article")
    article.className = "blog-card fade-in"
    article.style.animationDelay = `${index * 150}ms`

    const formattedDate = new Date(post.date).toLocaleDateString(this.currentLanguage === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    article.innerHTML = `
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title[this.currentLanguage]}" loading="lazy">
                <div class="blog-category">${post.category[this.currentLanguage]}</div>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">📅 ${formattedDate}</span>
                </div>
                <h3 class="blog-title">${post.title[this.currentLanguage]}</h3>
                <p class="blog-excerpt">${post.excerpt[this.currentLanguage]}</p>
                <a href="blog-post.html?id=${post.id}" class="blog-link">
                    <span>${this.currentLanguage === "ar" ? "اقرأ المزيد" : "Read More"}</span>
                    <span class="btn-arrow">→</span>
                </a>
            </div>
        `

    return article
  }

  renderPagination() {
    const pagination = document.getElementById("pagination")
    if (!pagination) return

    const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage)

    if (totalPages <= 1) {
      pagination.style.display = "none"
      return
    }

    pagination.style.display = "flex"
    pagination.innerHTML = ""

    // Previous button
    const prevBtn = document.createElement("button")
    prevBtn.className = "pagination-btn"
    prevBtn.textContent = this.currentLanguage === "ar" ? "السابق" : "Previous"
    prevBtn.disabled = this.currentPage === 1
    prevBtn.addEventListener("click", () => this.goToPage(this.currentPage - 1))
    pagination.appendChild(prevBtn)

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button")
      pageBtn.className = `pagination-btn ${i === this.currentPage ? "active" : ""}`
      pageBtn.textContent = i
      pageBtn.addEventListener("click", () => this.goToPage(i))
      pagination.appendChild(pageBtn)
    }

    // Next button
    const nextBtn = document.createElement("button")
    nextBtn.className = "pagination-btn"
    nextBtn.textContent = this.currentLanguage === "ar" ? "التالي" : "Next"
    nextBtn.disabled = this.currentPage === totalPages
    nextBtn.addEventListener("click", () => this.goToPage(this.currentPage + 1))
    pagination.appendChild(nextBtn)
  }

  hidePagination() {
    const pagination = document.getElementById("pagination")
    if (pagination) {
      pagination.style.display = "none"
    }
  }

  goToPage(page) {
    const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage)
    if (page < 1 || page > totalPages) return

    this.currentPage = page
    this.renderPosts()

    // Scroll to top of blog posts
    const blogPosts = document.querySelector(".blog-posts")
    if (blogPosts) {
      blogPosts.scrollIntoView({ behavior: "smooth" })
    }
  }

  updateResultsCount() {
    const resultsText = document.getElementById("results-text")
    if (!resultsText) return

    const total = this.posts.length
    const filtered = this.filteredPosts.length

    if (this.currentLanguage === "ar") {
      resultsText.textContent = `عرض ${filtered} من أصل ${total} مقال`
    } else {
      resultsText.textContent = `Showing ${filtered} of ${total} articles`
    }
  }

  updateNoResultsText() {
    const noResults = document.getElementById("no-results")
    if (!noResults) return

    const content = noResults.querySelector(".no-results-content")
    if (!content) return

    if (this.currentLanguage === "ar") {
      content.innerHTML = `
                <span class="no-results-icon">🔍</span>
                <h3>لم يتم العثور على نتائج</h3>
                <p>لم نتمكن من العثور على أي مقالات تطابق بحثك. جرب مصطلحات بحث مختلفة.</p>
                <button class="btn btn-primary" onclick="blogManager.clearFilters()">مسح الفلاتر</button>
            `
    } else {
      content.innerHTML = `
                <span class="no-results-icon">🔍</span>
                <h3>No Results Found</h3>
                <p>We couldn't find any articles matching your search. Try different search terms.</p>
                <button class="btn btn-primary" onclick="blogManager.clearFilters()">Clear Filters</button>
            `
    }
  }

  clearFilters() {
    // Reset search
    const searchInput = document.getElementById("search-input")
    if (searchInput) {
      searchInput.value = ""
    }

    // Reset category filter
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active")
    })
    document.querySelector('.filter-btn[data-category="all"]')?.classList.add("active")

    // Reset state
    this.currentSearch = ""
    this.currentCategory = "all"
    this.currentPage = 1

    // Re-filter and render
    this.filterPosts()
  }

  initScrollAnimations() {
    const cards = document.querySelectorAll(".blog-card.fade-in")
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, index * 100)
    })
  }
}

// Initialize blog manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize language first
  window.initializeLanguage()

  // Initialize blog manager
  window.blogManager = new BlogManager()

  // Initialize other components
  initMobileMenu()
  initFloatingChat()
})

// Mobile menu functionality
function initMobileMenu() {
  const mobileNav = document.getElementById("mobile-nav")
  const menuToggle = document.querySelector(".mobile-menu-toggle")

  if (!mobileNav || !menuToggle) return

  // Close menu when clicking on nav links
  const navLinks = mobileNav.querySelectorAll("a")
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

// Floating chat functionality
function initFloatingChat() {
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

// Global functions
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

window.clearFilters = () => {
  if (window.blogManager) {
    window.blogManager.clearFilters()
  }
}

// Override language toggle to update blog content
const originalToggleLanguage = window.toggleLanguage
window.toggleLanguage = () => {
  originalToggleLanguage()

  // Dispatch custom event for blog manager
  document.dispatchEvent(new CustomEvent("languageChanged"))
}
