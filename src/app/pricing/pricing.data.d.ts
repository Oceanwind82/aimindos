export type Plan = {
  id: string;
  name: string;
  caption: string;
  price: number;
  cta: string;
  checkoutHref: string;
  note: string;
  popular: boolean;
  features: string[];
};

export type FeatureMatrixRow = {
  feature: string;
  availableIn: string[];
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type FAQ = {
  q: string;
  a: string;
};

export declare const plans: readonly Plan[];
export declare const featuresMatrix: readonly FeatureMatrixRow[];
export declare const testimonials: readonly Testimonial[];
export declare const logos: readonly string[];
export declare const faqs: readonly FAQ[];
