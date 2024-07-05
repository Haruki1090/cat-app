"use client";
import { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Loader } from "semantic-ui-react";

interface SearchedCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}

const fetchCatImage = async (): Promise<SearchedCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  return result[0];
};

export default function HomePage({ initialCatImageUrl }: IndexPageProps) {
  const [catImgUrl, setCatImgUrl] = useState(initialCatImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const catImage = await fetchCatImage();
    setCatImgUrl(catImage.url);
    setIsLoading(false);
  };

  return (
    <main>
      <div>
        <h1 className="text-3xl text-center m-6">猫画像アプリ</h1>
        <div className="flex flex-col">
          {isLoading ? (
            <Loader active inline="centered" />
          ) : (
            <img
              className="m-auto"
              src={catImgUrl}
              alt=""
              width={500}
              height="auto"
            />
          )}
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-full text-sm px-4 py-2 m-4"
            onClick={handleClick}
          >
            新しい猫の画像
          </button>
        </div>
      </div>
    </main>
  );
}
