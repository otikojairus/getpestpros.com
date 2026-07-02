import type { FaqItem } from "@/lib/pseo";

export function FAQSection({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="section-title text-3xl">
        Frequently Asked Questions
      </h2>
      <div className="faq-list">
        {faqs.map((faq) => (
          <article key={faq.question} className="faq-item">
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
