export type AssistantLanguage = "English" | "Spanish" | "Bengali" | "Nepali" | "Chinese";

export const languages: AssistantLanguage[] = ["English", "Spanish", "Bengali", "Nepali", "Chinese"];

export const primaryInsights: Record<AssistantLanguage, string> = {
  English:
    "Milk costs increased this week. If you keep the same price, your profit will shrink. Consider raising Milk Gallon from $4.49 to $4.99.",
  Spanish:
    "El costo de la leche aumentó esta semana. Si mantiene el mismo precio, su ganancia bajará. Considere subir Milk Gallon de $4.49 a $4.99.",
  Bengali:
    "এই সপ্তাহে দুধের খরচ বেড়েছে। একই দাম রাখলে লাভ কমে যাবে। Milk Gallon-এর দাম $4.49 থেকে $4.99 করার কথা ভাবুন।",
  Nepali:
    "यो हप्ता दूधको लागत बढेको छ। उही मूल्य राख्दा नाफा घट्न सक्छ। Milk Gallon को मूल्य $4.49 बाट $4.99 बनाउन विचार गर्नुहोस्।",
  Chinese:
    "本周牛奶成本上涨。如果保持相同售价，利润会下降。建议将 Milk Gallon 从 $4.49 调整到 $4.99。",
};

export const assistantPrompts = [
  {
    id: "alert",
    title: "Explain this alert",
    responses: {
      English: "Milk vendor cost rose 8.2%. Your margin on Milk Gallon dropped. Consider a price change or smaller reorder.",
      Spanish: "El costo del proveedor de leche subió 8.2%. Su margen en Milk Gallon bajó. Considere cambiar el precio o pedir menos.",
      Bengali: "দুধের সরবরাহকারীর খরচ ৮.২% বেড়েছে। Milk Gallon-এ লাভ কমেছে। দাম বা অর্ডার পরিমাণ ঠিক করুন।",
      Nepali: "दूध आपूर्तिकर्ताको लागत ८.२% बढ्यो। Milk Gallon मा नाफा घट्यो। मूल्य वा अर्डर समायोजन गर्नुहोस्।",
      Chinese: "牛奶供应商成本上涨 8.2%，Milk Gallon 利润率下降。建议调价或减少订货。",
    },
  },
  {
    id: "reorder",
    title: "What should I reorder?",
    responses: {
      English: "Reorder Red Bull (6 cases) and Coca-Cola (5 cases). Hold Kettle Chips until stock clears.",
      Spanish: "Reordene Red Bull (6 cajas) y Coca-Cola (5 cajas). Espere con Kettle Chips hasta vender stock.",
      Bengali: "Red Bull (৬ কেস) ও Coca-Cola (৫ কেস) অর্ডার করুন। Kettle Chips আগে স্টক কমান।",
      Nepali: "Red Bull (६ केस) र Coca-Cola (५ केस) अर्डर गर्नुहोस्। Kettle Chips पहिले स्टक घटाउनुहोस्।",
      Chinese: "建议补货 Red Bull（6 箱）和 Coca-Cola（5 箱）。Kettle Chips 等库存清完再订。",
    },
  },
  {
    id: "invoice",
    title: "Which invoice is urgent?",
    responses: {
      English: "Golden Supply Co. invoice for $286.40 is due in 48 hours. Pay this first to avoid a missed bill.",
      Spanish: "La factura de Golden Supply Co. por $286.40 vence en 48 horas. Páguela primero.",
      Bengali: "Golden Supply Co.-এর $২৮৬.৪০ বিল ৪৮ ঘণ্টায়। আগে এটি পরিশোধ করুন।",
      Nepali: "Golden Supply Co. को $२८६.४० बिल ४८ घण्टामा। पहिले यो तिर्नुहोस्।",
      Chinese: "Golden Supply Co. 发票 $286.40，48 小时内到期。请优先支付。",
    },
  },
  {
    id: "week",
    title: "What changed this week?",
    responses: {
      English: "Sales up 12.6%. Dairy costs hurt margins. Strong sellers: Red Bull, Coca-Cola. Review Kettle Chips before reorder.",
      Spanish: "Ventas +12.6%. Costos lácteos presionan márgenes. Fuertes: Red Bull, Coca-Cola. Revise Kettle Chips.",
      Bengali: "বিক্রি ১২.৬% বেড়েছে। দুগ্ধ খরচে মার্জিন চাপ। Red Bull, Coca-Cola ভালো। Kettle Chips পর্যালোচনা করুন।",
      Nepali: "बिक्री १२.६% बढ्यो। दुध लागतले मार्जिन दबायो। Red Bull, Coca-Cola राम्रो। Kettle Chips हेर्नुहोस्।",
      Chinese: "本周销售额增长 12.6%，乳制品成本挤压利润。Red Bull、Coca-Cola 表现好；Kettle Chips 补货前需复核。",
    },
  },
] as const;
