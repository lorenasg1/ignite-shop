import Image from "next/image"
import { styled } from "../styles"
import { HomeContainer, Product } from "../styles/pages/home"

import shirt1 from '../assets/1.png'
import shirt2 from '../assets/2.png'

const Button = styled('button', {
  backgroundColor: "$green300",
  borderRadius: 4,
  border: 0,
  padding: '8px 16px',

  span: {
    fontWeight: 'bold'
  },

  '&:hover': {
    filter: 'brightness(0.8)'
  }
})

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={shirt1} width={520} height={480} alt="camiseta 1" />

        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 79,99</span>
        </footer>
      </Product>

      <Product>
        <Image src={shirt2} width={520} height={480} alt="camiseta 1" />

        <footer>
          <strong>Camiseta y</strong>
          <span>R$ 79,99</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
