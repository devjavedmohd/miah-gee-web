import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { MANUFACTURERS } from '@/data/manufacturers';
import { DOSAGE_FORMS, inferDosageForm } from '@/data/dosageForms';
import { COMPANY } from '@/data/company';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) return { title: 'Product Not Found | Miah Gee Distributor' };

  return {
    title: `${product.name} (${product.pack}) | Miah Gee Distributor Peshawar`,
    description:
      product.tagline ||
      `${product.name} distributed by Miah Gee Distributor (Pvt) Ltd. Peshawar. Manufactured by ${MANUFACTURERS[product.manufacturer]?.name}.`,
    openGraph: {
      title: `${product.name} | Miah Gee Healthcare Distribution`,
      description: product.tagline || `Trade details and specifications for ${product.name}.`,
      images: [{ url: product.image }],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.manufacturer === product.manufacturer)
  ).slice(0, 4);

  const dosageKey = inferDosageForm(product);
  const dosageInfo = DOSAGE_FORMS[dosageKey];
  const manufacturer = MANUFACTURERS[product.manufacturer];

  return (
    <div className="product-page-layout">
      {/* Breadcrumb Bar */}
      <div className="product-breadcrumb-bar">
        <div className="w">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <Link href={`/products?category=${product.category}`}>{CATEGORIES[product.category]}</Link>
            <span className="sep">/</span>
            <span className="current">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="w section-padded">
        <ProductDetailClient
          product={product}
          dosageInfo={dosageInfo}
          manufacturer={manufacturer}
          relatedProducts={relatedProducts}
        />
      </div>
    </div>
  );
}
