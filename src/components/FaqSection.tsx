import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/modulesData';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = React.useState<string[]>(['faq-1', 'faq-2']);
  const [faqSearch, setFaqSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      faqSearch === '' ||
      item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.answer.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq-section" className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Citizen Knowledge Base</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading"
            style={{ color: 'var(--text-main)' }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-xl mx-auto">
            Practical answers to common legal, technical, and security questions regarding DigiLocker, Aadhaar, and PAN cards.
          </p>

          {/* Search bar inside FAQ */}
          <div className="mt-5 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search questions e.g. police check, penalty, lost PIN..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-3 text-xs">
            {['all', 'DigiLocker', 'Aadhaar', 'PAN Card', 'Cyber Safety', 'Online Forms'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Questions' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                id={`faq-accordion-${faq.id}`}
                className="rounded-2xl border transition-all overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: isOpen ? 'var(--border-highlight)' : 'var(--border-color)',
                  boxShadow: isOpen ? 'var(--card-shadow)' : 'none'
                }}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 font-semibold text-sm sm:text-base text-slate-900 dark:text-white"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 flex-shrink-0">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            No matching questions found for "{faqSearch}". Try searching with another term.
          </div>
        )}
      </div>
    </section>
  );
};
