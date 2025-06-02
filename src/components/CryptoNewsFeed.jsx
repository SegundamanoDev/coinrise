import React, { useState, useEffect } from "react";
import axios from "axios"; // You'll need to install axios: npm install axios or yarn add axios

const CryptoNewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // YOU WILL GET THIS API KEY LATER. For now, you can put a placeholder or your test key.
  // **IMPORTANT: For production, do NOT expose your API key directly in client-side code.**
  // Use a backend server to proxy your API requests to keep your key secure.
  const NEWS_DATA_API_KEY = "pub_19065f874c9a45c191325fbefe842c60"; // Replace with your actual key

  useEffect(() => {
    const fetchCryptoNews = async () => {
      try {
        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=${NEWS_DATA_API_KEY}&q=crypto OR cryptocurrency OR blockchain&language=en&category=technology`
          // You can customize the 'q' (query) and 'category' parameters as needed
          // Refer to NewsData.io API documentation for more options
        );

        if (response.data && response.data.results) {
          setNews(response.data.results);
        } else {
          setNews([]); // No results found
        }
      } catch (err) {
        console.error("Error fetching crypto news:", err);
        setError("Failed to fetch crypto news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoNews();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return <div className="crypto-news-container">Loading crypto news...</div>;
  }

  if (error) {
    return <div className="crypto-news-container error-message">{error}</div>;
  }

  return (
    <div className="crypto-news-container">
      <h2>Latest Crypto News</h2>
      {news.length > 0 ? (
        <ul className="news-list">
          {news.map((article) => (
            <li key={article.article_id} className="news-item">
              <h3>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.title}
                </a>
              </h3>
              {article.description && <p>{article.description}</p>}
              {article.source_name && (
                <span className="news-source">
                  Source: {article.source_name}
                </span>
              )}
              {article.pubDate && (
                <span className="news-date">
                  {" "}
                  - {new Date(article.pubDate).toLocaleDateString()}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No crypto news available at the moment.</p>
      )}
    </div>
  );
};

export default CryptoNewsFeed;
