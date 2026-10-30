import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Send,
  Star,
  Layers,
  X,
  Menu,
  Maximize2,
  Image as ImageIcon
} from 'lucide-react';
import {
  AGENCY_INFO,
  GALLERY_ITEMS,
  BRANCHES,
  TESTIMONIALS,
  GalleryItem,
  BranchItem
} from './data/agencyData';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeModalImage, setActiveModalImage] = useState<GalleryItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick Order State
  const [orderBranch, setOrderBranch] = useState<string>('الحديدة');
  const [orderProduct, setOrderProduct] = useState<string>(GALLERY_ITEMS[0].name);
  const [orderQuantity, setOrderQuantity] = useState<string>('2 جمام (جلسة ثنائية)');
  const [orderName, setOrderName] = useState<string>('');
  const [orderAddress, setOrderAddress] = useState<string>('');
  const [orderDeliveryTime, setOrderDeliveryTime] = useState<string>('قبل الظهر (مستعجل)');
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const totalSlides = GALLERY_ITEMS.length;

  // Carousel Navigation Handlers
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Keyboard navigation for slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        // In RTL, right arrow generally goes to previous or next depending on preference; let's bind explicitly
        prevSlide();
      } else if (e.key === 'ArrowLeft') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update order product when selected from gallery
  const selectProductForOrder = (item: GalleryItem) => {
    setOrderProduct(item.name);
    const orderSection = document.getElementById('order');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Build WhatsApp Message Link
  const buildWhatsAppLink = (phone: string, customMessage?: string) => {
    const text =
      customMessage ||
      `السلام عليكم ورحمة الله وبركاته، وكالة أحمد قائد الشعبي (ملك الجمام). أود الاستفسار والطلب منكم.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const getFormulatedOrderMessage = () => {
    let msg = `*طلب جديد - وكالة أحمد قائد الشعبي*\n`;
    msg += `--------------------------\n`;
    msg += `📍 *الفرع / المنطقة:* ${orderBranch}\n`;
    msg += `🌿 *الصنف المختار:* ${orderProduct}\n`;
    msg += `📦 *الكمية المطلوبة:* ${orderQuantity}\n`;
    msg += `⏰ *وقت التوصيل المفضل:* ${orderDeliveryTime}\n`;
    if (orderName.trim()) msg += `👤 *اسم العميل:* ${orderName}\n`;
    if (orderAddress.trim()) msg += `🏠 *العنوان / الحي:* ${orderAddress}\n`;
    if (orderNotes.trim()) msg += `📝 *ملاحظات خاصة:* ${orderNotes}\n`;
    msg += `--------------------------\n`;
    msg += `نرجو سرعة التجهيز والتأكيد. شكراً لكم.`;
    return msg;
  };

  const handleCopyOrder = () => {
    const msg = getFormulatedOrderMessage();
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentItem = GALLERY_ITEMS[currentSlide];

  return (
    <div className="min-h-screen bg-[#0e0c0a] text-[#f7f4ee] font-sans selection:bg-[#d97706]/30 selection:text-[#fde68a]">
      {/* ===================== COMPACT TOP HEADER ===================== */}
      <header className="sticky top-0 z-50 bg-[#14120f]/95 backdrop-blur-md border-b border-[#2e261a]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Brand Zone */}
          <a href="#hero" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-[#d97706] to-[#78350f] p-0.5 shadow-md shadow-amber-950/40">
              <div className="w-full h-full bg-[#171410] rounded-[7px] flex items-center justify-center border border-[#f59e0b]/30">
                <span className="text-xs sm:text-base font-black text-[#f59e0b]">الشعبي</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-lg font-black tracking-tight text-[#fbf7f0] whitespace-nowrap">
                وكالة أحمد قائد الشعبي
              </span>
              <span className="text-[10px] sm:text-xs text-[#a89984] font-medium whitespace-nowrap">
                ملك الجمام وأصالة الكيف
              </span>
            </div>
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#d4c8b8]">
            <a href="#gallery" className="text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4" />
              <span>معرض أصناف القات</span>
            </a>
            <a href="#features" className="hover:text-[#f59e0b] transition-colors whitespace-nowrap">أصالة الجودة</a>
            <a href="#order" className="hover:text-[#f59e0b] transition-colors whitespace-nowrap">الطلب السريع</a>
            <a href="#branches" className="hover:text-[#f59e0b] transition-colors whitespace-nowrap">فروعنا ومناطقنا</a>
            <a href="#contact" className="hover:text-[#f59e0b] transition-colors whitespace-nowrap">تواصل معنا</a>
          </nav>

          {/* Primary Action Button (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <a
              href={buildWhatsAppLink(AGENCY_INFO.phones[0].international, "مرحباً وكالة أحمد قائد الشعبي، أود الاستفسار عن توفر جمام اليوم والأسعار")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[#16a34a] hover:bg-[#22c55e] text-white shadow-md transition-all active:scale-95 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>طلب واتساب مباشر</span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg text-[#d4c8b8] hover:text-white hover:bg-[#231f18] transition-colors"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#161310] border-b border-[#2e261a] px-4 pt-2 pb-4 space-y-2 text-sm font-semibold">
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-amber-400 border-b border-[#2a2217] flex items-center justify-between"
            >
              <span>معرض صور القات (في البداية)</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">8 صور طازجة</span>
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#f7f4ee] hover:text-[#f59e0b] border-b border-[#2a2217]"
            >
              أصالة الجودة وأسرار الصنعة
            </a>
            <a
              href="#order"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#f7f4ee] hover:text-[#f59e0b] border-b border-[#2a2217]"
            >
              الطلب السريع عبر الواتساب
            </a>
            <a
              href="#branches"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#f7f4ee] hover:text-[#f59e0b] border-b border-[#2a2217]"
            >
              فروعنا ومناطق التوزيع
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#f7f4ee] hover:text-[#f59e0b]"
            >
              أرقام التواصل والفوتر
            </a>
            <div className="pt-2 grid grid-cols-2 gap-2">
              <a
                href={buildWhatsAppLink(AGENCY_INFO.phones[0].international)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold bg-[#16a34a] text-white"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب 737838755</span>
              </a>
              <a
                href={`tel:${AGENCY_INFO.phones[0].number}`}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold bg-[#272118] text-amber-400 border border-[#3d3323]"
              >
                <Phone className="w-4 h-4" />
                <span>اتصال هاتفي</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ===================== HERO INTRO BANNER (COMPACT FOR MOBILE) ===================== */}
      <section id="hero" className="pt-4 sm:pt-6 pb-2 px-3 sm:px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#241f17] border border-[#d97706]/30 text-[11px] sm:text-xs font-bold text-amber-400 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>وكالة أحمد قائد الشعبي · ملك الجمام وأصالة الكيف</span>
        </div>

        <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-[#fffdfa] tracking-tight leading-tight mb-2">
          أجود أنواع القات مقرط جمام بأرقى أنواع الجمامات
        </h1>

        <p className="text-xs sm:text-sm text-[#b8ab99] max-w-2xl mx-auto mb-3">
          الحديدة · الجراحي · شبوة · بيت الفقيه · المصبرية | قطاف فجر طازج يومياً وفرز يدوي نخب أول
        </p>

        {/* Quick action buttons row for mobile */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <a
            href={buildWhatsAppLink(AGENCY_INFO.phones[0].international, "السلام عليكم وكالة الشعبي، أريد طلب جمام اليوم")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#16a34a] hover:bg-[#22c55e] text-white shadow-md flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>واتساب: {AGENCY_INFO.phones[0].number}</span>
          </a>
          <a
            href={buildWhatsAppLink(AGENCY_INFO.phones[1].international, "السلام عليكم وكالة الشعبي، أريد حجز طلبية")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#231e17] hover:bg-[#2c261e] border border-amber-600/40 text-amber-300 flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>واتساب: {AGENCY_INFO.phones[1].number}</span>
          </a>
          <a
            href={`tel:${AGENCY_INFO.phones[0].number}`}
            className="px-3 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#1c1813] hover:bg-[#262019] border border-[#3b3122] text-[#e6ded3] flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>اتصال سريع</span>
          </a>
        </div>
      </section>

      {/* ===================== MAIN PHOTO GALLERY SLIDER IN THE BEGINNING ===================== */}
      {/* Specifically placed right in the beginning with left/right arrows, responsive scaling & uploaded image names */}
      <section id="gallery" className="py-2 sm:py-6 bg-[#120f0c] border-y border-[#2e261a]">
        <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-6">
          {/* Gallery Header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <h2 className="text-base sm:text-2xl font-black text-[#fffdfa] flex items-center gap-2">
                <span>معرض أصناف القات (مقرط جمام)</span>
              </h2>
            </div>
            <div className="text-xs sm:text-sm font-mono text-amber-400 bg-[#1c1813] px-2.5 py-1 rounded-md border border-[#382f21]">
              {currentSlide + 1} / {totalSlides}
            </div>
          </div>

          {/* Interactive Slider Container */}
          <div className="relative rounded-2xl bg-[#181410] border border-[#3a3020] overflow-hidden shadow-2xl group">
            {/* Main Slide Image Viewport */}
            <div className="relative h-64 sm:h-80 md:h-[440px] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={currentItem.image}
                alt={currentItem.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover sm:object-contain transition-all duration-300 cursor-pointer"
                onClick={() => setActiveModalImage(currentItem)}
              />

              {/* Gradient scrim for text readability */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3 sm:p-6" />

              {/* Zoom trigger in top corner */}
              <button
                onClick={() => setActiveModalImage(currentItem)}
                className="absolute top-3 left-3 p-2 rounded-lg bg-black/60 text-white hover:bg-black/90 transition-colors text-xs flex items-center gap-1 backdrop-blur-sm border border-white/10"
                title="تكبير الصورة"
              >
                <Maximize2 className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">تكبير وعرض كامل</span>
              </button>

              {/* Tag in top right */}
              <div className="absolute top-3 right-3 bg-[#d97706]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-bold text-white shadow-md">
                {currentItem.badge}
              </div>

              {/* Left & Right Navigation Arrows */}
              {/* In RTL: Right Arrow moves to Previous or Next as desired; we provide both clearly */}
              <button
                onClick={prevSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-black text-amber-400 border border-amber-500/40 hover:border-amber-400 flex items-center justify-center shadow-lg transition-all active:scale-90 z-20"
                aria-label="الصورة السابقة (يمين)"
                title="السابق"
              >
                <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-black text-amber-400 border border-amber-500/40 hover:border-amber-400 flex items-center justify-center shadow-lg transition-all active:scale-90 z-20"
                aria-label="الصورة التالية (شمال)"
                title="التالي"
              >
                <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>

              {/* Information Overlay on Slide */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 z-10 text-right">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    {/* Filename Indicator as requested */}
                    <div className="inline-block text-[10px] sm:text-xs font-mono text-amber-300 bg-black/70 px-2 py-0.5 rounded border border-amber-500/30 mb-1">
                      اسم الملف: {currentItem.filename}
                    </div>

                    <h3 className="text-lg sm:text-2xl font-black text-white">
                      {currentItem.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#ded5c6] line-clamp-2 max-w-xl mt-0.5">
                      {currentItem.description}
                    </p>
                  </div>

                  {/* Slide Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
                    <button
                      onClick={() => selectProductForOrder(currentItem)}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#d97706] hover:bg-[#f59e0b] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
                    >
                      طلب هذا الصنف
                    </button>
                    <a
                      href={buildWhatsAppLink(
                        AGENCY_INFO.phones[0].international,
                        `السلام عليكم وكالة أحمد قائد الشعبي، أود الاستفسار وطلب صنف (${currentItem.name}) [ملف: ${currentItem.filename}]. هل متوفر اليوم؟`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#16a34a] hover:bg-[#22c55e] text-white text-xs sm:text-sm font-bold flex items-center gap-1 shadow-md transition-all active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>واتساب فوري</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation Strip (Touch / Swipe & Click friendly) */}
            <div className="p-2 sm:p-3 bg-[#13100d] border-t border-[#2e261a]">
              <div className="flex items-center justify-between text-[11px] text-[#a89984] mb-2 px-1">
                <span>اضغط على أي صورة للتنقل الفوري:</span>
                <span className="text-amber-400 font-medium">8 صور من تصوير الوكالة الميداني</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {GALLERY_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`relative shrink-0 w-16 h-14 sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentSlide === idx
                        ? 'border-amber-500 scale-105 shadow-md shadow-amber-500/20'
                        : 'border-[#33291d] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute bottom-0.5 right-1 text-[9px] font-bold text-white bg-black/70 px-1 rounded">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE US / QUALITY FEATURES ===================== */}
      <section id="features" className="py-10 sm:py-16 bg-[#0e0c0a] border-b border-[#2e261a]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider">
              أصالة الكيف وعراقة المهنة
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-[#fffdfa] mt-1 mb-2">
              أسرار جودة جمام أحمد قائد الشعبي
            </h2>
            <p className="text-xs sm:text-sm text-[#b8ab99]">
              نهتم بأدق التفاصيل من لحظة قطف الفجر حتى وصول الشدة إلى يديك بطراوتها الكاملة.
            </p>
          </div>

          {/* 4 Pillars Grid (Compact on mobile) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="p-3.5 sm:p-5 rounded-xl bg-[#161310] border border-[#2e261a] hover:border-amber-500/40 transition-colors">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2.5">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#f7f4ee] mb-1">أرقى الجمامات</h3>
              <p className="text-xs text-[#a89984] leading-relaxed">
                فرز واختيار دقيق لأطراف الغصون الطرية بدون خلط، لطعم رائق ونظيف.
              </p>
            </div>

            <div className="p-3.5 sm:p-5 rounded-xl bg-[#161310] border border-[#2e261a] hover:border-amber-500/40 transition-colors">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2.5">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#f7f4ee] mb-1">مقرط جمام متقن</h3>
              <p className="text-xs text-[#a89984] leading-relaxed">
                تربيط يدوي محكم يحفظ نداوة العود ويمنع الذبول حتى وقت المقيل.
              </p>
            </div>

            <div className="p-3.5 sm:p-5 rounded-xl bg-[#161310] border border-[#2e261a] hover:border-amber-500/40 transition-colors">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2.5">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#f7f4ee] mb-1">توزيع يومي مبرد</h3>
              <p className="text-xs text-[#a89984] leading-relaxed">
                إرساليات سريعة للحديدة والجراحي وشبوة وبيت الفقيه والمصبرية.
              </p>
            </div>

            <div className="p-3.5 sm:p-5 rounded-xl bg-[#161310] border border-[#2e261a] hover:border-amber-500/40 transition-colors">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2.5">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#f7f4ee] mb-1">أمانة وثقة</h3>
              <p className="text-xs text-[#a89984] leading-relaxed">
                سمعة طيبة وتجهيز خاص لطلبيات الأعراس والمناسبات الكبرى.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SMART DIRECT ORDER SECTION ===================== */}
      <section id="order" className="py-10 sm:py-16 bg-[#13100d] border-b border-[#2e261a]">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider">
              حجز وطلب فوري
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-[#fffdfa] mt-1 mb-2">
              طلب جمامك اليوم عبر الواتساب
            </h2>
            <p className="text-xs sm:text-sm text-[#b8ab99]">
              اختر الفرع والصنف المفضل وسيتم إرسال الطلب المنسق بضغطة زر إلى الوكالة.
            </p>
          </div>

          <div className="bg-[#181410] rounded-2xl border border-[#362c1d] p-4 sm:p-7 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
              {/* Branch */}
              <div>
                <label className="block text-xs font-bold text-[#ded5c6] mb-1">
                  الفرع أو منطقة التوصيل:
                </label>
                <select
                  value={orderBranch}
                  onChange={(e) => setOrderBranch(e.target.value)}
                  className="w-full bg-[#100e0b] border border-[#3b3122] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#f7f4ee] focus:outline-none focus:border-amber-500"
                >
                  {AGENCY_INFO.branchesList.map((branch) => (
                    <option key={branch} value={branch}>
                      فرع {branch}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product */}
              <div>
                <label className="block text-xs font-bold text-[#ded5c6] mb-1">
                  نوع الجمام:
                </label>
                <select
                  value={orderProduct}
                  onChange={(e) => setOrderProduct(e.target.value)}
                  className="w-full bg-[#100e0b] border border-[#3b3122] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#f7f4ee] focus:outline-none focus:border-amber-500"
                >
                  {GALLERY_ITEMS.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name} ({item.badge})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-bold text-[#ded5c6] mb-1">
                  الكمية:
                </label>
                <select
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(e.target.value)}
                  className="w-full bg-[#100e0b] border border-[#3b3122] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#f7f4ee] focus:outline-none focus:border-amber-500"
                >
                  <option value="1 جمام (نخب شخصي)">1 جمام (نخب شخصي)</option>
                  <option value="2 جمام (جلسة ثنائية)">2 جمام (جلسة ثنائية)</option>
                  <option value="3 جمام">3 جمام</option>
                  <option value="شدة جمام كاملة (5 جمامات)">شدة جمام كاملة (5 جمامات)</option>
                  <option value="شدتين فأكثر (مقيل كامل)">شدتين فأكثر (مقيل كامل)</option>
                  <option value="طلبية خاصة للمناسبات والأعراس">طلبية خاصة للمناسبات والأعراس</option>
                </select>
              </div>

              {/* Delivery Time */}
              <div>
                <label className="block text-xs font-bold text-[#ded5c6] mb-1">
                  وقت الاستلام المفضل:
                </label>
                <select
                  value={orderDeliveryTime}
                  onChange={(e) => setOrderDeliveryTime(e.target.value)}
                  className="w-full bg-[#100e0b] border border-[#3b3122] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#f7f4ee] focus:outline-none focus:border-amber-500"
                >
                  <option value="قبل الظهر (مستعجل مع الإرسالية الأولى)">قبل الظهر (مستعجل مع الإرسالية الأولى)</option>
                  <option value="وقت الظهيرة (12:00 م - 1:30 م)">وقت الظهيرة (12:00 م - 1:30 م)</option>
                  <option value="العصر (توصيل للمقيل مباشرة)">العصر (توصيل للمقيل مباشرة)</option>
                </select>
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold text-[#ded5c6] mb-1">
                  الاسم (اختياري):
                </label>
                <input
                  type="text"
                  placeholder="مثال: أبو محمد"
                  value={orderName}
                  onChange={(e) => setOrderName(e.target.value)}
                  className="w-full bg-[#100e0b] border border-[#3b3122] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#f7f4ee] focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-[#ded5c6] mb-1">
                  الحي أو العنوان:
                </label>
                <input
                  type="text"
                  placeholder="مثال: شارع الميناء / جوار مسجد..."
                  value={orderAddress}
                  onChange={(e) => setOrderAddress(e.target.value)}
                  className="w-full bg-[#100e0b] border border-[#3b3122] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#f7f4ee] focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-[#ded5c6] mb-1">
                ملاحظات خاصة:
              </label>
              <input
                type="text"
                placeholder="درجة الورق، نوع المقرط، أو أي طلب خاص..."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full bg-[#100e0b] border border-[#3b3122] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#f7f4ee] focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Live Message Preview & Direct Send */}
            <div className="bg-[#100e0b] p-3 rounded-xl border border-[#2e261a] mb-4">
              <div className="flex items-center justify-between text-[11px] text-[#a89984] mb-1.5">
                <span>معاينة نص الطلبية المنسقة:</span>
                <button
                  onClick={handleCopyOrder}
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>نسخ النص</span>
                    </>
                  )}
                </button>
              </div>
              <div className="text-[11px] sm:text-xs text-[#ded5c6] font-mono whitespace-pre-line leading-relaxed">
                {getFormulatedOrderMessage()}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={buildWhatsAppLink(
                  AGENCY_INFO.phones[0].international,
                  getFormulatedOrderMessage()
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#16a34a] hover:bg-[#22c55e] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>إرسال للرقم الأساسي ({AGENCY_INFO.phones[0].number})</span>
              </a>

              <a
                href={buildWhatsAppLink(
                  AGENCY_INFO.phones[1].international,
                  getFormulatedOrderMessage()
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#231e17] hover:bg-[#2c261e] border border-amber-600/40 text-amber-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Send className="w-4 h-4 text-emerald-400" />
                <span>إرسال للرقم الثاني ({AGENCY_INFO.phones[1].number})</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BRANCHES & LOCATIONS SECTION ===================== */}
      <section id="branches" className="py-10 sm:py-16 bg-[#0e0c0a] border-b border-[#2e261a]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider">
              فروعنا ومناطق التوزيع
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-[#fffdfa] mt-1 mb-2">
              تغطية يومية سريعة لـ 5 مناطق رئيسية
            </h2>
            <p className="text-xs sm:text-sm text-[#b8ab99]">
              إرساليات صباحية مبردة تضمن وصول الجمام طرياً وندياً.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {BRANCHES.map((branch) => (
              <div
                key={branch.id}
                className="p-4 sm:p-5 rounded-xl bg-[#161310] border border-[#2e261a] hover:border-amber-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {branch.region}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      {branch.status}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-[#fffdfa] mb-2 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>{branch.name}</span>
                  </h3>

                  <div className="space-y-1.5 text-xs text-[#b8ab99] mb-4">
                    <div className="flex items-start gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{branch.arrivalTime}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{branch.coverage}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#2a2217] grid grid-cols-2 gap-2">
                  <a
                    href={buildWhatsAppLink(
                      branch.phone1 === '737838755'
                        ? AGENCY_INFO.phones[0].international
                        : AGENCY_INFO.phones[1].international,
                      `السلام عليكم، أود التواصل مع مسؤول ${branch.name} بخصوص توفر الجمام اليوم.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-2 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>واتساب</span>
                  </a>
                  <a
                    href={`tel:${branch.phone1}`}
                    className="py-1.5 px-2 rounded-lg bg-[#231e17] text-[#ded5c6] text-xs font-semibold flex items-center justify-center gap-1 transition-colors border border-[#382f22]"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>اتصال</span>
                  </a>
                </div>
              </div>
            ))}

            {/* Weddings & Bulk Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-[#241d14] to-[#17130e] border border-[#d97706]/40 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#d97706] text-white mb-2 inline-block">
                  خدمة الأعراس والمناسبات
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#fffdfa] mb-2">
                  تجهيز طلبيات المقايل الكبرى
                </h3>
                <p className="text-xs text-[#ded5c6] leading-relaxed mb-3">
                  نوفر كميات خاصة ومقرطة بعناية للمناسبات والأعراس في كافة الفروع، مع ضمان جودة موحدة للجميع.
                </p>
              </div>

              <a
                href={buildWhatsAppLink(
                  AGENCY_INFO.phones[0].international,
                  'السلام عليكم، نود التنسيق معكم لحجز طلبية خاصة لمناسبة / عرس.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#d97706] to-[#b45309] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>حجز طلبية مناسبات عبر واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== DIRECT CONTACT & CTA BANNER ===================== */}
      <section id="contact" className="py-10 sm:py-16 bg-[#13100d] border-b border-[#2e261a]">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
          <div className="p-6 sm:p-10 rounded-2xl bg-[#1c1813] border border-amber-600/40 shadow-xl">
            <span className="text-[11px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
              خدمة سريعة وتواصل مباشر
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-[#fffdfa] mb-3">
              اطلب الآن من وكالة أحمد قائد الشعبي
            </h2>
            <p className="text-xs sm:text-sm text-[#ded5c6] max-w-lg mx-auto mb-6">
              فريقنا جاهز للرد الفوري وتجهيز طلبك بأرقى أنواع الجمامات المفرزة يدوياً.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-6">
              <div className="p-3 rounded-xl bg-[#120f0c] border border-[#3b3122] flex items-center justify-between">
                <div className="text-right">
                  <div className="text-[10px] text-[#a89984]">الرقم الأساسي:</div>
                  <div className="text-base sm:text-lg font-black text-amber-400 font-mono">
                    737838755
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href={buildWhatsAppLink(AGENCY_INFO.phones[0].international)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#16a34a] text-white"
                    title="واتساب"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a
                    href={`tel:${AGENCY_INFO.phones[0].number}`}
                    className="p-2 rounded-lg bg-[#272118] text-amber-400 border border-[#382f22]"
                    title="اتصال"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#120f0c] border border-[#3b3122] flex items-center justify-between">
                <div className="text-right">
                  <div className="text-[10px] text-[#a89984]">الرقم الثاني:</div>
                  <div className="text-base sm:text-lg font-black text-amber-400 font-mono">
                    774612954
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href={buildWhatsAppLink(AGENCY_INFO.phones[1].international)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#16a34a] text-white"
                    title="واتساب"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a
                    href={`tel:${AGENCY_INFO.phones[1].number}`}
                    className="p-2 rounded-lg bg-[#272118] text-amber-400 border border-[#382f22]"
                    title="اتصال"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <a
              href="#gallery"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#d97706] hover:bg-[#f59e0b] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
            >
              <ImageIcon className="w-4 h-4" />
              <span>الرجوع لمعرض الصور في البداية</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="bg-[#0b0908] py-8 border-t border-[#231d14] text-xs text-[#8c8070]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right mb-6">
            <div>
              <div className="text-base font-black text-[#fffdfa]">وكالة أحمد قائد الشعبي</div>
              <div className="text-xs text-amber-400 font-medium">ملك الجمام وأصالة الكيف - لجميع أنواع القات</div>
            </div>
            <div className="text-xs text-[#b8ab99]">
              الفروع: الحديدة · الجراحي · شبوة · بيت الفقيه · المصبرية
            </div>
          </div>
          <div className="pt-4 border-t border-[#1d1811] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#716656] text-center sm:text-right">
            <div>جميع الحقوق محفوظة © {new Date().getFullYear()} - وكالة أحمد قائد الشعبي.</div>
            <div>أرقام المبيعات والتوزيع: 737838755 / 774612954</div>
          </div>
        </div>
      </footer>

      {/* ===================== ULTRA-COMPACT FLOATING ACTION BAR FOR MOBILE ===================== */}
      {/* Strict compliance with mobile 15% sticky cap (~50px height) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#14120f]/95 backdrop-blur-md border-t border-[#3b3122] py-2 px-3 shadow-2xl">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          <a
            href={buildWhatsAppLink(AGENCY_INFO.phones[0].international, "السلام عليكم، أود طلب جمام الآن")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-2.5 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors whitespace-nowrap shadow-md"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span>واتساب 737838755</span>
          </a>

          <a
            href={buildWhatsAppLink(AGENCY_INFO.phones[1].international, "السلام عليكم، أود حجز طلبية")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-2.5 rounded-lg bg-[#1f1a14] hover:bg-[#2c241c] border border-amber-600/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1 transition-colors whitespace-nowrap shadow-md"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>واتساب 774612954</span>
          </a>

          <a
            href={`tel:${AGENCY_INFO.phones[0].number}`}
            className="py-2 px-3 rounded-lg bg-[#272118] hover:bg-[#342c20] text-[#ded5c6] text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-[#3d3323] shrink-0"
            title="اتصال هاتفي"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">اتصال</span>
          </a>
        </div>
      </div>

      {/* ===================== FULLSCREEN LIGHTBOX MODAL ===================== */}
      {activeModalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#161310] rounded-2xl border border-[#3b3122] overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeModalImage.image}
                alt={activeModalImage.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setActiveModalImage(null)}
                className="absolute top-3 left-3 p-2 rounded-full bg-black/80 text-white hover:bg-black transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 bg-[#14120f] border-t border-[#2a2217] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-mono text-amber-400">
                  اسم الملف المرفق: {activeModalImage.filename}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                  {activeModalImage.name}
                </h3>
                <p className="text-xs text-[#a89984] mt-1">{activeModalImage.description}</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    selectProductForOrder(activeModalImage);
                    setActiveModalImage(null);
                  }}
                  className="flex-1 sm:flex-initial py-2 px-3 rounded-lg bg-amber-600 text-white text-xs font-bold whitespace-nowrap"
                >
                  طلب في النموذج
                </button>
                <a
                  href={buildWhatsAppLink(
                    AGENCY_INFO.phones[0].international,
                    `السلام عليكم، أود طلب صنف (${activeModalImage.name}) [الملف: ${activeModalImage.filename}].`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial py-2 px-3 rounded-lg bg-[#16a34a] text-white text-xs font-bold flex items-center justify-center gap-1 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>طلب واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
