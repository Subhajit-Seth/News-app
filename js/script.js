// document.addEventListener('DOMContentLoaded', () => {
//     // const apiKey = 'd1cb5b30ea2af32622baba74a2258360'; // Your GNews API Key
//     const apiKey = 'pub_25c61abc4c3942adaca1e3c8f6aa464b'; // NewsData.io API Key
//     const newsGrid = document.getElementById('news-grid');
//     const featuredArticlePlaceholder = document.getElementById('featured-article-placeholder');
//     const categoryLinks = document.querySelectorAll('.category-link');
//     const currentCategoryTitleEl = document.getElementById('current-category-title');
//     const loadingIndicator = document.getElementById('loading-indicator');
//     const errorMessageEl = document.getElementById('error-message');
//     const loadMoreBtn = document.getElementById('load-more-btn');
//     const hamburgerMenu = document.getElementById('hamburger-menu');
//     const navMenu = document.getElementById('nav-menu');

//     const defaultPlaceholderImage = 'images/placeholder.jpg'; // Optional: Path to a local placeholder
//     const articlesPerPage = 10; // Number of articles to fetch per page
//     let currentPage = 1;
//     let currentCategory = 'general'; // Default category
//     let totalArticlesAvailable = 0;
//     let isLoading = false; // Prevent multiple simultaneous loads

//     // Hamburger Menu Toggle
//     hamburgerMenu.addEventListener('click', () => {
//         navMenu.classList.toggle('is-active');
//         hamburgerMenu.classList.toggle('is-active');
//         const isExpanded = navMenu.classList.contains('is-active');
//         hamburgerMenu.setAttribute('aria-expanded', isExpanded);
//     });

//     // async function fetchNews(category, page = 1, isLoadMore = false) {
//     //     if (isLoading) return;
//     //     isLoading = true;

//     //     loadingIndicator.style.display = 'block';
//     //     if (!isLoadMore) {
//     //         newsGrid.innerHTML = '';
//     //         featuredArticlePlaceholder.innerHTML = ''; // Clear featured article too
//     //         errorMessageEl.style.display = 'none';
//     //         loadMoreBtn.style.display = 'none'; // Hide button on new category load
//     //     }

//     //     let apiUrl = `https://gnews.io/api/v4/top-headlines?lang=hi&country=in&apikey=${apiKey}&max=${articlesPerPage}&page=${page}`;
//     //     if (category !== 'general') {
//     //         apiUrl = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=hi&country=in&apikey=${apiKey}&max=${articlesPerPage}&page=${page}`;
//     //     }

//     //     const selectedLink = document.querySelector(`.category-link[data-category="${category}"]`);
//     //     currentCategoryTitleEl.textContent = selectedLink ? selectedLink.textContent : 'मुख्य समाचार';

//     //     try {
//     //         const response = await fetch(apiUrl);
//     //         if (!response.ok) {
//     //             const errorData = await response.json();
//     //             let errorMsg = `API Error: ${response.status}`;
//     //             if (errorData && errorData.errors) {
//     //                 errorMsg += ` - ${errorData.errors.join(', ')}`;
//     //             } else {
//     //                 errorMsg += ` - ${response.statusText}`;
//     //             }
//     //             throw new Error(errorMsg);
//     //         }
//     //         const data = await response.json();
//     //         totalArticlesAvailable = data.totalArticles;

//     //         if (data.articles && data.articles.length > 0) {
//     //             displayNews(data.articles, isLoadMore, page === 1);
//     //             if ((page * articlesPerPage) < totalArticlesAvailable && data.articles.length === articlesPerPage) {
//     //                 loadMoreBtn.style.display = 'block';
//     //             } else {
//     //                 loadMoreBtn.style.display = 'none'; // No more articles or API returned less than max
//     //             }
//     //         } else {
//     //             if (!isLoadMore) {
//     //                 newsGrid.innerHTML = '<p style="text-align: center;">इस श्रेणी में कोई समाचार उपलब्ध नहीं है।</p>';
//     //             }
//     //             loadMoreBtn.style.display = 'none';
//     //         }
//     //     } catch (error) {
//     //         console.error('Error fetching news:', error);
//     //         errorMessageEl.innerHTML = `<p>समाचार लोड करने में असमर्थ: ${error.message}. API की सीमा समाप्त हो सकती है या नेटवर्क समस्या हो सकती है।</p>`;
//     //         errorMessageEl.style.display = 'block';
//     //         if (!isLoadMore) newsGrid.innerHTML = '';
//     //         loadMoreBtn.style.display = 'none';
//     //     } finally {
//     //         loadingIndicator.style.display = 'none';
//     //         isLoading = false;
//     //     }
//     // }

//     // Replace the existing fetchNews function with this:
//     async function fetchNews(category, page = 1, isLoadMore = false) {
//         if (isLoading) return;
//         isLoading = true;

//         loadingIndicator.style.display = 'block';
//         if (!isLoadMore) {
//             newsGrid.innerHTML = '';
//             featuredArticlePlaceholder.innerHTML = '';
//             errorMessageEl.style.display = 'none';
//             loadMoreBtn.style.display = 'none';
//         }

//         // NewsData.io API parameters - removed page parameter
//         let apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=hi`;

//         // Map your categories to NewsData.io categories
//         const categoryMap = {
//             'general': '',
//             'world': 'world',
//             'business': 'business',
//             'technology': 'technology',
//             'nation': 'politics', // Using politics as closest match
//             'entertainment': 'entertainment',
//             'sports': 'sports',
//             'science': 'science',
//             'health': 'health'
//         };

//         if (category !== 'general' && categoryMap[category]) {
//             apiUrl += `&category=${categoryMap[category]}`;
//         }

//         const selectedLink = document.querySelector(`.category-link[data-category="${category}"]`);
//         currentCategoryTitleEl.textContent = selectedLink ? selectedLink.textContent : 'मुख्य समाचार';

//         try {
//             const response = await fetch(apiUrl);
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 let errorMsg = `API Error: ${response.status}`;
//                 if (errorData && errorData.message) {
//                     errorMsg += ` - ${errorData.message}`;
//                 } else {
//                     errorMsg += ` - ${response.statusText}`;
//                 }
//                 throw new Error(errorMsg);
//             }
//             const data = await response.json();

//             // NewsData.io uses 'results' instead of 'articles'
//             const articles = data.results || [];
//             totalArticlesAvailable = data.totalResults || 0;

//             if (articles.length > 0) {
//                 displayNews(articles, isLoadMore, true); // Always treat as first page since we're not paginating
//                 loadMoreBtn.style.display = 'none'; // Hide load more button since we're not implementing pagination
//             } else {
//                 if (!isLoadMore) {
//                     newsGrid.innerHTML = '<p style="text-align: center;">इस श्रेणी में कोई समाचार उपलब्ध नहीं है।</p>';
//                 }
//                 loadMoreBtn.style.display = 'none';
//             }
//         } catch (error) {
//             console.error('Error fetching news:', error);
//             errorMessageEl.innerHTML = `<p>समाचार लोड करने में असमर्थ: ${error.message}. API की सीमा समाप्त हो सकती है या नेटवर्क समस्या हो सकती है।</p>`;
//             errorMessageEl.style.display = 'block';
//             if (!isLoadMore) newsGrid.innerHTML = '';
//             loadMoreBtn.style.display = 'none';
//         } finally {
//             loadingIndicator.style.display = 'none';
//             isLoading = false;
//         }
//     }

//     // function createNewsCard(article, isFeatured = false) {
//     //     const newsCard = document.createElement('div');
//     //     newsCard.classList.add('news-card');
//     //     if (isFeatured) {
//     //         newsCard.classList.add('featured-article');
//     //     }

//     //     const imageSrc = article.image || defaultPlaceholderImage;
//     //     const imageAlt = article.title || "समाचार छवि";
//     //     const imageClass = article.image ? "thumbnail" : "placeholder-thumbnail";

//     //     const title = article.title ? article.title.replace(/ - .*/, '') : "शीर्षक उपलब्ध नहीं है"; // Attempt to shorten title
//     //     const shortDescription = article.description ? article.description.substring(0, isFeatured ? 200 : 100) + '...' : 'विवरण उपलब्ध नहीं है।';

//     //     newsCard.innerHTML = `
//     //         <img src="${imageSrc}" alt="${imageAlt}" class="${imageClass}" onerror="this.onerror=null;this.src='${defaultPlaceholderImage}';this.classList.add('placeholder-thumbnail');">
//     //         <div class="news-card-content">
//     //             <h3>${title}</h3>
//     //             <p class="description">${shortDescription}</p>
//     //             <div class="meta">
//     //                 <span>स्रोत: ${article.source.name}</span><br>
//     //                 <span>${new Date(article.publishedAt).toLocaleString('hi-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
//     //             </div>
//     //             <button class="read-more-btn">पूरा पढ़ें</button>
//     //         </div>
//     //     `;

//     //     const readMoreButton = newsCard.querySelector('.read-more-btn');
//     //     readMoreButton.addEventListener('click', (e) => {
//     //         e.stopPropagation(); // Prevent card click if button is inside clickable card area
//     //         localStorage.setItem('selectedArticle', JSON.stringify(article));
//     //         window.location.href = 'news-detail.html';
//     //     });

//     //     // Optional: make the whole card clickable if not featured
//     //     // if (!isFeatured) {
//     //     //     newsCard.addEventListener('click', () => {
//     //     //         localStorage.setItem('selectedArticle', JSON.stringify(article));
//     //     //         window.location.href = 'news-detail.html';
//     //     //     });
//     //     //     newsCard.style.cursor = 'pointer';
//     //     // }


//     //     return newsCard;
//     // }

//     // Update the createNewsCard function with this:
//     function createNewsCard(article, isFeatured = false) {
//         const newsCard = document.createElement('div');
//         newsCard.classList.add('news-card');
//         if (isFeatured) {
//             newsCard.classList.add('featured-article');
//         }

//         // NewsData.io uses 'image_url' instead of 'image'
//         const imageSrc = article.image_url || defaultPlaceholderImage;
//         const imageAlt = article.title || "समाचार छवि";
//         const imageClass = article.image_url ? "thumbnail" : "placeholder-thumbnail";

//         const title = article.title || "शीर्षक उपलब्ध नहीं है";
//         // NewsData.io uses 'description' or 'content'
//         const shortDescription = article.description ?
//             article.description.substring(0, isFeatured ? 200 : 100) + '...' :
//             'विवरण उपलब्ध नहीं है।';

//         newsCard.innerHTML = `
//         <img src="${imageSrc}" alt="${imageAlt}" class="${imageClass}" onerror="this.onerror=null;this.src='${defaultPlaceholderImage}';this.classList.add('placeholder-thumbnail');">
//         <div class="news-card-content">
//             <h3>${title}</h3>
//             <p class="description">${shortDescription}</p>
//             <div class="meta">
//                 <span>स्रोत: ${article.source_id || 'अज्ञात स्रोत'}</span><br>
//                 <span>${new Date(article.pubDate).toLocaleString('hi-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
//             </div>
//             <button class="read-more-btn">पूरा पढ़ें</button>
//         </div>
//     `;

//         const readMoreButton = newsCard.querySelector('.read-more-btn');
//         readMoreButton.addEventListener('click', (e) => {
//             e.stopPropagation();
//             localStorage.setItem('selectedArticle', JSON.stringify(article));
//             window.location.href = 'news-detail.html';
//         });

//         return newsCard;
//     }

//     function displayNews(articles, isLoadMore, isFirstPage) {
//         if (!isLoadMore) { // Initial load for a category
//             newsGrid.innerHTML = '';
//             featuredArticlePlaceholder.innerHTML = '';
//         }

//         articles.forEach((article, index) => {
//             if (!article.title || article.title.toLowerCase() === "[removed]") {
//                 return; // Skip articles with no title or marked as removed
//             }

//             if (isFirstPage && index === 0 && !isLoadMore) { // Display first article as featured
//                 const featuredCard = createNewsCard(article, true);
//                 featuredArticlePlaceholder.appendChild(featuredCard);
//             } else {
//                 const newsCard = createNewsCard(article, false);
//                 newsGrid.appendChild(newsCard);
//             }
//         });
//     }

//     categoryLinks.forEach(link => {
//         link.addEventListener('click', (e) => {
//             e.preventDefault();
//             const category = e.target.dataset.category;
//             if (currentCategory === category && !isLoading) return; // Avoid reload if same category & not loading

//             currentCategory = category;
//             currentPage = 1; // Reset to first page

//             categoryLinks.forEach(l => l.classList.remove('active'));
//             e.target.classList.add('active');

//             // Close mobile menu if open
//             if (navMenu.classList.contains('is-active')) {
//                 navMenu.classList.remove('is-active');
//                 hamburgerMenu.classList.remove('is-active');
//                 hamburgerMenu.setAttribute('aria-expanded', 'false');
//             }

//             fetchNews(currentCategory, currentPage, false);
//         });
//     });

//     // Replace the existing loadMoreBtn event listener with this:
//     loadMoreBtn.addEventListener('click', () => {
//         // Since we're not implementing pagination with NewsData.io API,
//         // we'll just fetch the same news again (or you could remove the button entirely)
//         if (isLoading) return;
//         fetchNews(currentCategory, 1, false);
//     });

//     // Initial load (मुख्य समाचार / General)
//     const initialActiveLink = document.querySelector('.category-link[data-category="general"]');
//     if (initialActiveLink) initialActiveLink.classList.add('active');
//     fetchNews(currentCategory, currentPage);
// });



document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'pub_25c61abc4c3942adaca1e3c8f6aa464b'; // NewsData.io API Key
    const newsGrid = document.getElementById('news-grid');
    const featuredArticlePlaceholder = document.getElementById('featured-article-placeholder');
    const categoryLinks = document.querySelectorAll('.category-link');
    const currentCategoryTitleEl = document.getElementById('current-category-title');
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorMessageEl = document.getElementById('error-message');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');

    const defaultPlaceholderImage = 'images/placeholder.jpg';
    const articlesPerPage = 10;
    let currentCategory = 'general';
    let isLoading = false;
    let nextPageToken = null; // Store the next page token

    // Hamburger Menu Toggle
    hamburgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('is-active');
        hamburgerMenu.classList.toggle('is-active');
        const isExpanded = navMenu.classList.contains('is-active');
        hamburgerMenu.setAttribute('aria-expanded', isExpanded);
    });

    async function fetchNews(category, isLoadMore = false) {
        if (isLoading) return;
        isLoading = true;

        loadingIndicator.style.display = 'block';
        if (!isLoadMore) {
            newsGrid.innerHTML = '';
            featuredArticlePlaceholder.innerHTML = '';
            errorMessageEl.style.display = 'none';
            loadMoreBtn.style.display = 'none';
            nextPageToken = null; // Reset pagination for new category
        }

        // NewsData.io API parameters
        let apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=hi`;

        // Map your categories to NewsData.io categories
        const categoryMap = {
            'general': 'top',
            'world': 'world',
            'business': 'business',
            'technology': 'technology',
            'nation': 'politics',
            'entertainment': 'entertainment',
            'sports': 'sports',
            'science': 'science',
            'health': 'health'
        };

        if (category !== 'general' && categoryMap[category]) {
            apiUrl += `&category=${categoryMap[category]}`;
        }

        // Add next page token if available
        if (isLoadMore && nextPageToken) {
            apiUrl += `&page=${nextPageToken}`;
        }

        const selectedLink = document.querySelector(`.category-link[data-category="${category}"]`);
        currentCategoryTitleEl.textContent = selectedLink ? selectedLink.textContent : 'मुख्य समाचार';

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                const errorData = await response.json();
                let errorMsg = `API Error: ${response.status}`;
                if (errorData && errorData.message) {
                    errorMsg += ` - ${errorData.message}`;
                } else {
                    errorMsg += ` - ${response.statusText}`;
                }
                throw new Error(errorMsg);
            }
            const data = await response.json();

            // Store the next page token for pagination
            nextPageToken = data.nextPage || null;

            const articles = data.results || [];

            if (articles.length > 0) {
                displayNews(articles, isLoadMore, !isLoadMore);

                // Show/hide load more button based on next page availability
                if (nextPageToken) {
                    loadMoreBtn.style.display = 'block';
                } else {
                    loadMoreBtn.style.display = 'none';
                }
            } else {
                if (!isLoadMore) {
                    newsGrid.innerHTML = '<p style="text-align: center;">इस श्रेणी में कोई समाचार उपलब्ध नहीं है।</p>';
                }
                loadMoreBtn.style.display = 'none';
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            errorMessageEl.innerHTML = `<p>समाचार लोड करने में असमर्थ: ${error.message}. API की सीमा समाप्त हो सकती है या नेटवर्क समस्या हो सकती है।</p>`;
            errorMessageEl.style.display = 'block';
            if (!isLoadMore) newsGrid.innerHTML = '';
            loadMoreBtn.style.display = 'none';
        } finally {
            loadingIndicator.style.display = 'none';
            isLoading = false;
        }
    }

    function createNewsCard(article, isFeatured = false) {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');
        if (isFeatured) {
            newsCard.classList.add('featured-article');
        }

        const imageSrc = article.image_url || defaultPlaceholderImage;
        const imageAlt = article.title || "समाचार छवि";
        const imageClass = article.image_url ? "thumbnail" : "placeholder-thumbnail";

        const title = article.title ? article.title.replace(/ - .*/, '') : "शीर्षक उपलब्ध नहीं है";
        const shortDescription = article.description ?
            article.description.substring(0, isFeatured ? 200 : 100) + '...' :
            'विवरण उपलब्ध नहीं है।';

        newsCard.innerHTML = `
            <img src="${imageSrc}" alt="${imageAlt}" class="${imageClass}" onerror="this.onerror=null;this.src='${defaultPlaceholderImage}';this.classList.add('placeholder-thumbnail');">
            <div class="news-card-content">
                <h3>${title}</h3>
                <p class="description">${shortDescription}</p>
                <div class="meta">
                    <span>स्रोत: ${article.source_id || 'अज्ञात स्रोत'}</span><br>
                    <span>${new Date(article.pubDate).toLocaleString('hi-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                </div>
                <button class="read-more-btn">पूरा पढ़ें</button>
            </div>
        `;

        const readMoreButton = newsCard.querySelector('.read-more-btn');
        readMoreButton.addEventListener('click', (e) => {
            e.stopPropagation();
            localStorage.setItem('selectedArticle', JSON.stringify(article));
            window.location.href = 'news-detail.html';
        });

        return newsCard;
    }

    function displayNews(articles, isLoadMore, isFirstPage) {
        if (!isLoadMore) {
            newsGrid.innerHTML = '';
            featuredArticlePlaceholder.innerHTML = '';
        }

        articles.forEach((article, index) => {
            if (!article.title || article.title.toLowerCase() === "[removed]") {
                return;
            }

            if (isFirstPage && index === 0 && !isLoadMore) {
                const featuredCard = createNewsCard(article, true);
                featuredArticlePlaceholder.appendChild(featuredCard);
            } else {
                const newsCard = createNewsCard(article, false);
                newsGrid.appendChild(newsCard);
            }
        });
    }

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            if (currentCategory === category && !isLoading) return;

            currentCategory = category;
            categoryLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');

            if (navMenu.classList.contains('is-active')) {
                navMenu.classList.remove('is-active');
                hamburgerMenu.classList.remove('is-active');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
            }

            fetchNews(currentCategory, false);
        });
    });

    loadMoreBtn.addEventListener('click', () => {
        if (isLoading || !nextPageToken) return;
        fetchNews(currentCategory, true);
    });

    // Initial load
    const initialActiveLink = document.querySelector('.category-link[data-category="general"]');
    if (initialActiveLink) initialActiveLink.classList.add('active');
    fetchNews(currentCategory, false);
});