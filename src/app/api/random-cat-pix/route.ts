import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

type APIResponse = {
  hits: {
    collections: number;
    comments: number;
    downloads: number;
    id: number;
    imageHeight: number;
    imageSize: number;
    imageWidth: number;
    largeImageURL: string;
    likes: number;
    pageURL: string;
    previewHeight: number;
    previewURL: string;
    previewWidth: number;
    tags: string;
    type: string;
    webformatURL: string;
  }[];
};

export async function GET(_: NextApiResponse, res: NextApiResponse) {
  try {
    const apiRes = await fetch(
      `https://pixabay.com/api/?key=${process.env.PIX_API_KEY}&q=cat&image_type=photo&pretty=true&orientation=horizontal&min_width=1280&min_height=720`,
      {
        method: "GET",
      },
    );
    const data: APIResponse = await apiRes.json();
    const min: number = 0;
    const max: number = data.hits.length - 1;
    const randomImagePos: number = Math.floor(
      Math.random() * (max - min + 1) + min,
    );
    const imageUrl: string = data.hits[randomImagePos].largeImageURL;

    console.log(imageUrl);
    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (err) {
    return NextResponse.json({}, { status: 400, statusText: String(err) });
  }
}
