// This is a conceptual example. Actual implementation will depend on your setup.

import React, { useEffect, useState } from 'react';

const CryptoNews = ({ newsdataApiKey }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
const newsdataApiakey = Pub_19065f874c9a45c191325fbefe842c60
    useEffect(() => {
        const fetchCryptoNews = async () => {
            try {
                // You might want to specify a category or search query for crypto news
                const response = await fetch(
                    `https://newsdata.io/api/1/latest?apikey=${newsdataApiKey}&q=crypto&language=en`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setNews(data.results); // Assuming 'results' array contains the news articles
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCryptoNews();
    }, [newsdataApiKey]);

    if (loading) {
        return <div className="text-center py-8">Loading crypto news...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Latest Crypto News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((article) => (
                    <div key={article.article_id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {article.image_url && (
                            <img src={article.image_url} alt={article.title} className="w-full h-48 object-cover" />
                        )}
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">{article.title}</h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{article.description}</p>
                            <a
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CryptoNews;
