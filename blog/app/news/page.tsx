import React from 'react'
import { drupalClient } from "../lib/drupalClient";
import Image from "next/image";
const baseUrl = process.env.DRUPAL_BASE_URL;
import Link from "next/link";

async function fetchToken() {
    try {
        const response = await fetch(`${baseUrl}/oauth/token`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                client_id: process.env.CLIENT_ID!,
                client_secret: process.env.CLIENT_SECRET!,
                username: process.env.USERNAME!,
                password: process.env.PASSWORD!,
                grant_type: process.env.GRANT_TYPE!,
                scope: process.env.SCOPE!
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch token');
        }

        const tokenData = await response.json();
        return tokenData;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function News() {

    const getToken = await fetchToken();
    const newsResponse = await drupalClient.fetch(`${baseUrl}/jsonapi/node/news`, {
        headers: {
            Authorization: `Bearer ${getToken.access_token}`
        }
    });

    const data = await newsResponse.json();

    const news = data.data;

    const getNews = news.map(async (item: any) => {
        const newsId = item.id;

        const imageId = item.relationships.field_news_image.data.id;

        const imageNews = await drupalClient.fetch(`${baseUrl}/jsonapi/file/mime_attachment_binary/${imageId}`, {
            headers: {
                Authorization: `Bearer ${getToken.access_token}`
            }
        });

        const image = await imageNews.json();
        const imageUrl = `${baseUrl}${image.data.attributes.uri.url}`;

        return (
            <div key={newsId} className="justify-center flex-1">
                <div className="rounded-2xl overflow-hidden">
                    <div className="p-7 text-xl">
                        <h1 className="font-extrabold text-gray-800 mb-5">
                            {item.attributes.title}
                        </h1>

                        <Image
                            src={imageUrl}
                            width={200}
                            height={200}
                            alt="image"
                            style={{maxWidth:"200px", height: "200px", objectFit: "cover"}}
                        />

                        <div dangerouslySetInnerHTML={{ __html: item.attributes.body.value }} className='newsDescription' />
                        <p className="text-gray-700 mb-5">
                            Start: {item.attributes.field_news_campaign_period.value} end:{" "}
                            {item.attributes.field_news_campaign_period.end_value}
                        </p>
                        <div className="flex gap-6">
                            <div className="rounded-full bg-gray-200 py-1 px-4 text-gray-800 hover:bg-slate-500">
                                <Link href={item.attributes.field_news_link.uri}>
                                    {item.attributes.field_news_link.title}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div>
            <div className="flex news">
                {getNews}
            </div>
        </div>
    )
}

export default News
