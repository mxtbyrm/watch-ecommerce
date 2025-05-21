// This is a mock data service that would typically fetch from an API

export async function getProducts() {
  // In a real app, this would fetch from an API
  return [
    {
      id: "1",
      name: "Submariner Date",
      brand: "Rolex",
      price: 14000,
      description: "The reference among divers' watches",
      image: "https://picsum.photos/1280/720?height=600&width=600",
      new: true,
      movement: "Automatic",
      caseMaterial: "Stainless Steel",
      waterResistance: "300m",
    },
    {
      id: "2",
      name: "Royal Oak",
      brand: "Audemars Piguet",
      price: 32000,
      description: "The iconic luxury sports watch",
      image: "https://picsum.photos/1280/720?height=600&width=600",
      new: false,
      movement: "Automatic",
      caseMaterial: "Stainless Steel",
      waterResistance: "50m",
    },
    {
      id: "3",
      name: "Nautilus",
      brand: "Patek Philippe",
      price: 35000,
      description: "Elegance and sportiness in perfect harmony",
      image: "https://picsum.photos/1280/720?height=600&width=600",
      new: false,
      movement: "Automatic",
      caseMaterial: "Stainless Steel",
      waterResistance: "120m",
    },
    {
      id: "4",
      name: "Seamaster Diver 300M",
      brand: "Omega",
      price: 5200,
      description: "Professional diving watch with a distinguished history",
      image: "https://picsum.photos/1280/720?height=600&width=600",
      new: true,
      movement: "Automatic",
      caseMaterial: "Stainless Steel",
      waterResistance: "300m",
    },
    {
      id: "5",
      name: "Luminor Marina",
      brand: "Panerai",
      price: 8700,
      description: "Distinctive Italian design with Swiss precision",
      image: "https://picsum.photos/1280/720?height=600&width=600",
      new: false,
      movement: "Automatic",
      caseMaterial: "Stainless Steel",
      waterResistance: "300m",
    },
    {
      id: "6",
      name: "Portugieser Chronograph",
      brand: "IWC",
      price: 7800,
      description: "Timeless elegance with chronograph functionality",
      image: "https://picsum.photos/1280/720?height=600&width=600",
      new: false,
      movement: "Automatic",
      caseMaterial: "Stainless Steel",
      waterResistance: "30m",
    },
    {
      id: "7",
      name: "Reverso Classic",
      brand: "Jaeger-LeCoultre",
      price: 7000,
      description: "The iconic reversible watch",
      image: "https://picsum.photos/1280/720?height=600&width=600",
      new: false,
      movement: "Manual",
      caseMaterial: "Stainless Steel",
      waterResistance: "30m",
    },
    {
      id: "8",
      name: "Speedmaster Moonwatch",
      brand: "Omega",
      price: 6300,
      description: "The first watch worn on the moon",
      image: "https://picsum.photos/1280/720?height=600&width=600",
      new: false,
      movement: "Manual",
      caseMaterial: "Stainless Steel",
      waterResistance: "50m",
    },
    {
      id: "9",
      name: "Datejust 41",
      brand: "Rolex",
      price: 9000,
      description: "The classic watch of reference",
      image: "https://picsum.photos/1280/720?height=600&width=600",
      new: true,
      movement: "Automatic",
      caseMaterial: "Stainless Steel",
      waterResistance: "100m",
    },
  ];
}

export async function getFeaturedProducts() {
  const products = await getProducts();
  return products.slice(0, 3);
}

export async function getProductById(id: string) {
  const products = await getProducts();
  const product = products.find((p) => p.id === id);

  if (!product) return null;

  // Add additional details for the product page
  return {
    ...product,
    images: [
      product.image,
      "https://picsum.photos/1280/720?height=800&width=800",
      "https://picsum.photos/1280/720?height=800&width=800",
      "https://picsum.photos/1280/720?height=800&width=800",
    ],
    specifications: {
      caseDiameter: "41mm",
      caseThickness: "12.5mm",
      bandMaterial: "Stainless Steel",
      movementType: "Mechanical",
      powerReserve: "70 hours",
    },
    features: [
      "Scratch-resistant sapphire crystal",
      "Luminescent hands and hour markers",
      "Screw-down crown",
      "Unidirectional rotating bezel",
      "Date display at 3 o'clock",
      "COSC certified chronometer",
    ],
  };
}

export async function getRelatedProducts(currentProductId: string) {
  const products = await getProducts();
  return products.filter((p) => p.id !== currentProductId).slice(0, 4);
}

export async function getProductReviews(productId: string) {
  // In a real app, this would fetch reviews for a specific product
  return [
    {
      id: "r1",
      name: "James Wilson",
      avatar: "https://picsum.photos/1280/720?height=40&width=40",
      date: "May 15, 2023",
      rating: 5,
      title: "Exceptional timepiece",
      content:
        "This watch exceeds all expectations. The craftsmanship is impeccable, and it keeps perfect time. I've received numerous compliments since purchasing it. Definitely worth the investment.",
    },
    {
      id: "r2",
      name: "Emily Chen",
      avatar: "https://picsum.photos/1280/720?height=40&width=40",
      date: "April 3, 2023",
      rating: 4,
      title: "Beautiful design, minor issues",
      content:
        "The watch is stunning and feels premium on the wrist. My only complaint is that the clasp sometimes feels a bit loose. Otherwise, it's a fantastic timepiece that I wear daily.",
    },
    {
      id: "r3",
      name: "Michael Rodriguez",
      avatar: "https://picsum.photos/1280/720?height=40&width=40",
      date: "March 22, 2023",
      rating: 5,
      title: "A true heirloom piece",
      content:
        "I purchased this watch to celebrate a milestone in my career, and I couldn't be happier. The attention to detail is remarkable, and it feels like something I'll pass down to future generations.",
    },
  ];
}
