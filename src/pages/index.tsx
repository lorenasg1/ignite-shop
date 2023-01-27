import { useKeenSlider } from 'keen-slider/react'
import Image from "next/image"
import { HomeContainer, Product } from "../styles/pages/home"


import 'keen-slider/keen-slider.min.css'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import { ProductItem } from './product/[id]'

type Product = Omit<ProductItem, 'description'>

type HomeProps = {
  products: Product[]
}

export default function Home({ products }: HomeProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <Product className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="camiseta 1" />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        </Link>
      ))}
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const defaultPrice = product.default_price as Stripe.Price;
    const price = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BRL",
    }).format((defaultPrice.unit_amount || 0) / 100);

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 24,
  };
};
