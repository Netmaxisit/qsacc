"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import type { GoogleReview } from "@/app/api/reviews/route";

// Curated base reviews — live Google reviews are merged on top of these automatically.
// Add more here any time you want to feature a specific review.
const CURATED_REVIEWS: GoogleReview[] = [
  {
    author_name: "shaheer farooq",
    rating: 5,
    text: "I recently worked with Quicksolve accountants for support with my VAT requirements, and I couldn't be happier with the service. From start to finish, the team was professional, knowledgeable, and incredibly patient. They explained everything clearly, handled the entire process with efficiency, and made what could have been a stressful situation feel simple and manageable. Their expertise in VAT regulations was evident, and they proactively identified ways to improve accuracy and compliance. I highly recommend Quicksolve accountants to anyone looking for reliable, friendly, and highly competent accounting support. A fantastic experience from a team you can truly trust!",
    relative_time_description: "3 months ago",
    profile_photo_url: "",
  },
  {
    author_name: "your essentials",
    rating: 5,
    text: "I been with Quicksolve Accountants for over 5 years and they're like a family to me. They look after me through hard times and been very patient. I recommend this place to anyone who wants a proper team in their side. Thank you Mr Riaz and Bilal ❤️",
    relative_time_description: "a month ago",
    profile_photo_url: "",
  },
  {
    author_name: "Waseem Imran",
    rating: 5,
    text: "I cannot recommend Quicksolve Accountants enough! Their team is professional, knowledgeable, and incredibly efficient. They took the stress out of managing my accounts and provided clear, practical advice tailored to my needs. Communication was excellent throughout, and they were always quick to respond to any questions I had. It's clear they genuinely care about their clients and go above and beyond to ensure everything is handled perfectly.",
    relative_time_description: "a year ago",
    profile_photo_url: "",
  },
  {
    author_name: "Adnan Iqbal",
    rating: 5,
    text: "Quicksolve accounts is well maintained and consistently meets expectations. Thank you for your continued effort and professionalism.",
    relative_time_description: "2 months ago",
    profile_photo_url: "",
  },
  {
    author_name: "Random Click",
    rating: 5,
    text: "Quicksolve Accountants has been amazing! Their team is knowledgeable, responsive, and makes accounting stress-free. They explain everything clearly, handle my taxes and finances seamlessly, and their online responses are super convenient. I feel they genuinely care about my financial success. Highly recommended!",
    relative_time_description: "a year ago",
    profile_photo_url: "",
  },
  {
    author_name: "Mohammed Aziz",
    rating: 5,
    text: "Outstanding service from start to finish. Quicksolve handled my self-assessment tax return quickly and made sure I wasn't paying more than I needed to. Very transparent about fees and always available to help. Will be using them every year.",
    relative_time_description: "8 months ago",
    profile_photo_url: "",
  },
  {
    author_name: "Karen Whitfield",
    rating: 5,
    text: "I switched to Quicksolve after being let down by my previous accountant and the difference is night and day. They got my books up to date, sorted out a backlog of paperwork, and have been brilliant ever since. Friendly, efficient, and completely trustworthy.",
    relative_time_description: "10 months ago",
    profile_photo_url: "",
  },
  {
    author_name: "Tariq Hussain",
    rating: 5,
    text: "Quicksolve have been handling my limited company accounts for two years now. The team is always on hand to answer questions and nothing is ever too much trouble. Their knowledge of tax planning has saved me a considerable amount each year. Highly recommended.",
    relative_time_description: "11 months ago",
    profile_photo_url: "",
  },
  {
    author_name: "Lisa Brennan",
    rating: 5,
    text: "As a self-employed person new to running my own business, I was completely overwhelmed by the financial side. Quicksolve made everything so simple. They walked me through everything step by step and I now feel fully in control of my finances. Cannot thank them enough.",
    relative_time_description: "7 months ago",
    profile_photo_url: "",
  },
  {
    author_name: "Usman Rashid",
    rating: 5,
    text: "Very professional and reliable firm. They set up my payroll, handle my VAT returns, and keep my accounts in perfect order. The team is always responsive and proactive — they flagged a potential issue before it became a problem. Exactly what you want from an accountant.",
    relative_time_description: "9 months ago",
    profile_photo_url: "",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col justify-between h-full"
      style={{ background: "#ffffff", minHeight: 200 }}
    >
      <p className="text-sm leading-relaxed mb-6" style={{ color: "#374151" }} suppressHydrationWarning>
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {review.profile_photo_url ? (
            <img
              src={review.profile_photo_url}
              alt={review.author_name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #0E5D6B, #1A7A8C)" }}
            >
              {initials(review.author_name)}
            </div>
          )}
          <div>
            <div className="text-sm font-semibold" style={{ color: "#1A2B2E" }} suppressHydrationWarning>
              {review.author_name}
            </div>
            <div className="text-xs" style={{ color: "#94A3B8" }} suppressHydrationWarning>
              {review.relative_time_description}
            </div>
          </div>
        </div>
        <Quote size={28} style={{ color: "#E2E8F0" }} />
      </div>
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [reviews, setReviews] = useState<GoogleReview[]>(CURATED_REVIEWS);
  const [overallRating, setOverallRating] = useState(4.9);
  const [totalCount, setTotalCount] = useState<number | null>(76);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        if (data.reviews?.length) {
          // Merge: live reviews first, then curated ones not already in the live set
          const liveNames = new Set(
            (data.reviews as GoogleReview[]).map((r) => r.author_name.toLowerCase())
          );
          const extras = CURATED_REVIEWS.filter(
            (r) => !liveNames.has(r.author_name.toLowerCase())
          );
          setReviews([...data.reviews, ...extras]);
          setOverallRating(data.rating);
          setTotalCount(data.user_ratings_total);
        }
      })
      .catch(() => {/* keep curated fallback */});
  }, []);

  const perPage = 2;
  const pageCount = Math.ceil(reviews.length / perPage);

  function prev() {
    setDirection(-1);
    setIndex((i) => (i - 1 + pageCount) % pageCount);
  }

  function next() {
    setDirection(1);
    setIndex((i) => (i + 1) % pageCount);
  }

  const visible = reviews.slice(index * perPage, index * perPage + perPage);

  return (
    <section className="py-24 lg:py-32" style={{ background: "#F8FAFC" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium mb-5"
            style={{
              border: "1px solid #CBD5E1",
              color: "#374151",
              background: "transparent",
            }}
          >
            Testimonials
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ color: "#1A2B2E" }}
          >
            What Our{" "}
            <em style={{ color: "#0E5D6B", fontStyle: "italic" }}>Clients Say</em>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#64748B" }}>
            We value every client&apos;s feedback and are committed to delivering
            expert, dependable accounting services across Manchester.
          </p>
        </motion.div>

        {/* Carousel card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-3xl p-8 md:p-10"
          style={{
            background: "linear-gradient(145deg, #0A3F4A 0%, #0E5D6B 100%)",
          }}
        >
          {/* Review cards */}
          <div className="relative overflow-hidden mb-8">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d * 60, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d * -60, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {visible.map((review, i) => (
                  <ReviewCard key={i} review={review} />
                ))}
                {/* Pad to always show 2 columns */}
                {visible.length === 1 && (
                  <div className="hidden sm:block" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between flex-wrap gap-4 mt-2">
            {/* Google badge */}
            <a
              href="https://www.google.com/search?q=Quicksolve+Accountants+Reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 hover:brightness-110"
              style={{ background: "rgba(255,255,255,0.10)" }}
            >
              {/* Google "G" logo */}
              <svg width="22" height="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold leading-none" style={{ color: "#ffffff" }}>
                    {overallRating.toFixed(1)}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={13}
                        fill={s <= Math.round(overallRating) ? "#D3B267" : "none"}
                        stroke={s <= Math.round(overallRating) ? "#D3B267" : "#94A3B8"}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.80)" }} suppressHydrationWarning>
                  {totalCount !== null ? `${totalCount} Google reviews` : "Google reviews"}
                </div>
              </div>
            </a>

            {/* Prev / Next */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: "#D3B267", color: "#0A3F4A" }}
                aria-label="Previous reviews"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: "#D3B267", color: "#0A3F4A" }}
                aria-label="Next reviews"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
