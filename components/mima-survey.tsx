"use client"
import { useState, useRef, useEffect } from "react"
import { useLang } from "@/app/providers"

const MIMA_AVATAR = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1771973866321-yfsQ8gDzKNdg5PALUQ5Hsxb1mshd7X.png"

const MODULES_SR = [
  { id: "PLAN", name: "Planiranje" },
  { id: "FLOW", name: "Procesi" },
  { id: "MOVE", name: "Isporuka" },
  { id: "STOCK", name: "Kapacitet" },
  { id: "TRACK", name: "Praćenje" },
  { id: "OPS", name: "Organizacija" },
  { id: "RISK", name: "Rizici" },
]

const MODULES_EN = [
  { id: "PLAN", name: "Planning" },
  { id: "FLOW", name: "Processes" },
  { id: "MOVE", name: "Delivery" },
  { id: "STOCK", name: "Capacity" },
  { id: "TRACK", name: "Tracking" },
  { id: "OPS", name: "Organisation" },
  { id: "RISK", name: "Risks" },
]

type Industry = "Proizvodnja" | "Distribucija" | "Maloprodaja" | "Usluge" | "Transport" | "Projekti" | "Mesovito"

interface Question {
  id: string
  module: string
  text: string
  options: { key: string; text: string; score: number }[]
}

const INDUSTRY_DISPLAY_EN: Record<string, string> = {
  "Proizvodnja": "manufacturing",
  "Distribucija": "distribution / wholesale",
  "Maloprodaja": "retail",
  "Usluge": "services",
  "Transport": "transport / logistics",
  "Projekti": "project-based work",
  "Mesovito": "mixed",
}

const OPS_QUESTIONS_SR: Question[] = [
  { id: "P6.1", module: "OPS", text: "Kada se pojavi operativna situacija:", options: [{ key: "A", text: "Najčešće dolaze kod mene", score: 0 }, { key: "B", text: "Pokušaju pa me uključe", score: 3 }, { key: "C", text: "Rešavaju samostalno", score: 5 }] },
  { id: "P6.2", module: "OPS", text: "Koliki deo odluka ide preko vas?", options: [{ key: "A", text: "Većina", score: 0 }, { key: "B", text: "Dobar deo", score: 3 }, { key: "C", text: "Manji deo", score: 5 }] },
  { id: "P6.3", module: "OPS", text: "Kako je definisan način rada?", options: [{ key: "A", text: "Nije jasno definisan", score: 0 }, { key: "B", text: "Postoji, ali nije uvek isti", score: 3 }, { key: "C", text: "Jasno je definisan i koristi se", score: 5 }] },
]

const OPS_QUESTIONS_EN: Question[] = [
  { id: "P6.1", module: "OPS", text: "When an operational situation comes up:", options: [{ key: "A", text: "They usually come to me", score: 0 }, { key: "B", text: "They try first, then involve me", score: 3 }, { key: "C", text: "They resolve it on their own", score: 5 }] },
  { id: "P6.2", module: "OPS", text: "What share of decisions goes through you?", options: [{ key: "A", text: "Most of them", score: 0 }, { key: "B", text: "A good portion", score: 3 }, { key: "C", text: "A small portion", score: 5 }] },
  { id: "P6.3", module: "OPS", text: "How is the way of working defined?", options: [{ key: "A", text: "Not clearly defined", score: 0 }, { key: "B", text: "It exists, but isn't always consistent", score: 3 }, { key: "C", text: "Clearly defined and followed", score: 5 }] },
]

const RISK_QUESTIONS_SR: Question[] = [
  { id: "P7.1", module: "RISK", text: "Ako ključni radnik izostane:", options: [{ key: "A", text: "Posao se značajno uspori", score: 0 }, { key: "B", text: "Nastavljamo uz prilagođavanje", score: 3 }, { key: "C", text: "Posao ide stabilno", score: 5 }] },
  { id: "P7.2", module: "RISK", text: "Kako pristupate zastojima i nepredviđenim situacijama?", options: [{ key: "A", text: "Reagujemo kada se dese", score: 0 }, { key: "B", text: "Uglavnom znamo šta da radimo", score: 3 }, { key: "C", text: "Imamo jasan pristup", score: 5 }] },
  { id: "P7.3", module: "RISK", text: "Ko najčešće rešava operativne situacije?", options: [{ key: "A", text: "Ja", score: 0 }, { key: "B", text: "Tim uz mene", score: 3 }, { key: "C", text: "Tim samostalno", score: 5 }] },
]

const RISK_QUESTIONS_EN: Question[] = [
  { id: "P7.1", module: "RISK", text: "If a key employee is unavailable:", options: [{ key: "A", text: "Work slows down significantly", score: 0 }, { key: "B", text: "We continue with adjustments", score: 3 }, { key: "C", text: "Work continues smoothly", score: 5 }] },
  { id: "P7.2", module: "RISK", text: "How do you handle disruptions and unexpected situations?", options: [{ key: "A", text: "We react when they happen", score: 0 }, { key: "B", text: "We usually know what to do", score: 3 }, { key: "C", text: "We have a clear approach", score: 5 }] },
  { id: "P7.3", module: "RISK", text: "Who typically resolves operational situations?", options: [{ key: "A", text: "Me", score: 0 }, { key: "B", text: "The team with my involvement", score: 3 }, { key: "C", text: "The team independently", score: 5 }] },
]

const QUESTIONS_BY_INDUSTRY_SR: Record<Industry, Question[]> = {
  Proizvodnja: [
    { id: "P1.1", module: "PLAN", text: "Kako obično planirate proizvodnju za naredni period?", options: [{ key: "A", text: "U hodu, prema narudžbinama", score: 0 }, { key: "B", text: "Imamo okvir koji prilagođavamo", score: 3 }, { key: "C", text: "Imamo plan koji uglavnom pratimo", score: 5 }] },
    { id: "P1.2", module: "PLAN", text: "Koliko je timu jasno šta treba da se proizvede i do kada?", options: [{ key: "A", text: "Uglavnom se dogovaramo u hodu", score: 0 }, { key: "B", text: "Postoji okvir, uz dodatna objašnjenja", score: 3 }, { key: "C", text: "Jasno je definisano svima", score: 5 }] },
    { id: "P2.1", module: "FLOW", text: "Koliko je rezultat proizvodnje ujednačen između smena ili serija?", options: [{ key: "A", text: "Često ima razlika", score: 0 }, { key: "B", text: "Uglavnom je ujednačen", score: 3 }, { key: "C", text: "Stabilan je", score: 5 }] },
    { id: "P2.2", module: "FLOW", text: "Kako novi radnik ulazi u posao?", options: [{ key: "A", text: "Duže radi uz podršku", score: 0 }, { key: "B", text: "Postepeno se osamostaljuje", score: 3 }, { key: "C", text: "Brzo radi samostalno", score: 5 }] },
    { id: "P3.1", module: "MOVE", text: "Kako obično primetite da isporuka kasni?", options: [{ key: "A", text: "Najčešće kada se kupac javi", score: 0 }, { key: "B", text: "Uočimo u toku isporuke", score: 3 }, { key: "C", text: "Imamo pregled unapred", score: 5 }] },
    { id: "P3.2", module: "MOVE", text: "Kada kupac pita za status porudžbine:", options: [{ key: "A", text: "Proverimo pa se javimo", score: 0 }, { key: "B", text: "Damo okvirnu informaciju", score: 3 }, { key: "C", text: "Odmah imamo tačan status", score: 5 }] },
    { id: "P4.1", module: "STOCK", text: "Koliko jasno znate kapacitet proizvodnje za naredni period?", options: [{ key: "A", text: "Teško procenjujemo", score: 0 }, { key: "B", text: "Imamo okvirnu sliku", score: 3 }, { key: "C", text: "Jasno znamo", score: 5 }] },
    { id: "P4.2", module: "STOCK", text: "Koliko se često desi zastoj zbog materijala?", options: [{ key: "A", text: "Dešava se često", score: 0 }, { key: "B", text: "Dešava se povremeno", score: 3 }, { key: "C", text: "Retko se dešava", score: 5 }] },
    { id: "P5.1", module: "TRACK", text: "Kako pratite učinak proizvodnje?", options: [{ key: "A", text: "Kada se pojavi potreba", score: 0 }, { key: "B", text: "Povremeno proveravamo", score: 3 }, { key: "C", text: "Redovno pratimo", score: 5 }] },
    { id: "P5.2", module: "TRACK", text: "Koliko brzo možete da sagledate kako ide proizvodnja ove nedelje?", options: [{ key: "A", text: "Treba vreme da proverimo", score: 0 }, { key: "B", text: "Imamo okvirnu sliku", score: 3 }, { key: "C", text: "Vidimo odmah", score: 5 }] },
    { id: "P5.3", module: "TRACK", text: "Koliko vam je jasan profit po proizvodu?", options: [{ key: "A", text: "Nije jasno", score: 0 }, { key: "B", text: "Delimično je jasno", score: 3 }, { key: "C", text: "Jasno je", score: 5 }] },
    ...OPS_QUESTIONS_SR, ...RISK_QUESTIONS_SR,
  ],
  Distribucija: [
    { id: "P1.1", module: "PLAN", text: "Kako planirate nabavku?", options: [{ key: "A", text: "Po potrebi", score: 0 }, { key: "B", text: "Delimično unapred", score: 3 }, { key: "C", text: "Plan postoji i prati se", score: 5 }] },
    { id: "P1.2", module: "PLAN", text: "Da li tim zna ciljeve prodaje i zaliha?", options: [{ key: "A", text: "Ne baš", score: 0 }, { key: "B", text: "Delimično", score: 3 }, { key: "C", text: "Jasno zna", score: 5 }] },
    { id: "P2.1", module: "FLOW", text: "Koliko je tok porudžbine od prijema do isporuke ujednačen?", options: [{ key: "A", text: "Često se razlikuje", score: 0 }, { key: "B", text: "Uglavnom je sličan", score: 3 }, { key: "C", text: "Stabilan je", score: 5 }] },
    { id: "P2.2", module: "FLOW", text: "Kako novi zaposleni ulazi u posao?", options: [{ key: "A", text: "Duže radi uz podršku", score: 0 }, { key: "B", text: "Postepeno se osamostaljuje", score: 3 }, { key: "C", text: "Brzo radi samostalno", score: 5 }] },
    { id: "P3.1", module: "MOVE", text: "Koliko imate pregled gde je roba u toku isporuke?", options: [{ key: "A", text: "Ograničen pregled", score: 0 }, { key: "B", text: "Delimičan pregled", score: 3 }, { key: "C", text: "Jasan pregled", score: 5 }] },
    { id: "P3.2", module: "MOVE", text: "Kada kupac pita za status isporuke:", options: [{ key: "A", text: "Proverimo pa se javimo", score: 0 }, { key: "B", text: "Damo procenu", score: 3 }, { key: "C", text: "Odmah znamo", score: 5 }] },
    { id: "P4.1", module: "STOCK", text: "Koliko često nemate robu koju kupac traži?", options: [{ key: "A", text: "Često se dešava", score: 0 }, { key: "B", text: "Dešava se povremeno", score: 3 }, { key: "C", text: "Retko se dešava", score: 5 }] },
    { id: "P4.2", module: "STOCK", text: "Koliko jasno znate uzrok viška ili manjka robe?", options: [{ key: "A", text: "Nije jasno", score: 0 }, { key: "B", text: "Delimično jasno", score: 3 }, { key: "C", text: "Jasno", score: 5 }] },
    { id: "P5.1", module: "TRACK", text: "Kako pratite stanje zaliha?", options: [{ key: "A", text: "Kada se pojavi potreba", score: 0 }, { key: "B", text: "Povremeno", score: 3 }, { key: "C", text: "Redovno", score: 5 }] },
    { id: "P5.2", module: "TRACK", text: "Koliko brzo možete da vidite stanje robe?", options: [{ key: "A", text: "Treba vreme da proverimo", score: 0 }, { key: "B", text: "Imamo okvir", score: 3 }, { key: "C", text: "Vidimo odmah", score: 5 }] },
    { id: "P5.3", module: "TRACK", text: "Koliko vam je jasno koji artikli donose najviše prihoda?", options: [{ key: "A", text: "Nije jasno", score: 0 }, { key: "B", text: "Delimično", score: 3 }, { key: "C", text: "Jasno", score: 5 }] },
    ...OPS_QUESTIONS_SR, ...RISK_QUESTIONS_SR,
  ],
  Maloprodaja: [
    { id: "P1.1", module: "PLAN", text: "Kako planirate prodaju?", options: [{ key: "A", text: "Iz dana u dan", score: 0 }, { key: "B", text: "Delimično unapred", score: 3 }, { key: "C", text: "Plan postoji", score: 5 }] },
    { id: "P1.2", module: "PLAN", text: "Da li tim zna ciljeve prodaje?", options: [{ key: "A", text: "Ne baš", score: 0 }, { key: "B", text: "Delimično", score: 3 }, { key: "C", text: "Jasno zna", score: 5 }] },
    { id: "P2.1", module: "FLOW", text: "Koliko je način rada u prodavnici ujednačen?", options: [{ key: "A", text: "Razlikuje se", score: 0 }, { key: "B", text: "Uglavnom je sličan", score: 3 }, { key: "C", text: "Stabilan je", score: 5 }] },
    { id: "P2.2", module: "FLOW", text: "Kako novi prodavac ulazi u posao?", options: [{ key: "A", text: "Duže radi uz podršku", score: 0 }, { key: "B", text: "Postepeno se osamostaljuje", score: 3 }, { key: "C", text: "Brzo radi samostalno", score: 5 }] },
    { id: "P3.1", module: "MOVE", text: "Kako obično saznate da proizvod nije dostupan?", options: [{ key: "A", text: "Kupac nas upozori", score: 0 }, { key: "B", text: "Primetimo u toku rada", score: 3 }, { key: "C", text: "Imamo pregled unapred", score: 5 }] },
    { id: "P3.2", module: "MOVE", text: "Kada kupac traži proizvod:", options: [{ key: "A", text: "Potražimo", score: 0 }, { key: "B", text: "Uglavnom znamo, uz proveru", score: 3 }, { key: "C", text: "Odmah znamo", score: 5 }] },
    { id: "P4.1", module: "STOCK", text: "Koliko često nemate traženi proizvod?", options: [{ key: "A", text: "Često", score: 0 }, { key: "B", text: "Povremeno", score: 3 }, { key: "C", text: "Retko", score: 5 }] },
    { id: "P4.2", module: "STOCK", text: "Koliko jasno znate koji proizvodi se sporije prodaju?", options: [{ key: "A", text: "Nije jasno", score: 0 }, { key: "B", text: "Delimično", score: 3 }, { key: "C", text: "Jasno", score: 5 }] },
    { id: "P5.1", module: "TRACK", text: "Kako pratite prodaju?", options: [{ key: "A", text: "Kada se pojavi potreba", score: 0 }, { key: "B", text: "Povremeno", score: 3 }, { key: "C", text: "Redovno", score: 5 }] },
    { id: "P5.2", module: "TRACK", text: "Koliko brzo možete da vidite današnji promet?", options: [{ key: "A", text: "Treba vreme", score: 0 }, { key: "B", text: "Imamo okvir", score: 3 }, { key: "C", text: "Vidimo odmah", score: 5 }] },
    { id: "P5.3", module: "TRACK", text: "Koliko vam je jasno koji proizvodi donose najveću zaradu?", options: [{ key: "A", text: "Nije jasno", score: 0 }, { key: "B", text: "Delimično", score: 3 }, { key: "C", text: "Jasno", score: 5 }] },
    ...OPS_QUESTIONS_SR, ...RISK_QUESTIONS_SR,
  ],
  Usluge: [
    { id: "P1.1", module: "PLAN", text: "Kako planirate rad sa klijentima i prihode?", options: [{ key: "A", text: "U hodu", score: 0 }, { key: "B", text: "Delimično unapred", score: 3 }, { key: "C", text: "Plan postoji", score: 5 }] },
    { id: "P1.2", module: "PLAN", text: "Da li tim zna ciljeve?", options: [{ key: "A", text: "Ne baš", score: 0 }, { key: "B", text: "Delimično", score: 3 }, { key: "C", text: "Jasno zna", score: 5 }] },
    { id: "P2.1", module: "FLOW", text: "Koliko je način rada sa klijentima ujednačen?", options: [{ key: "A", text: "Razlikuje se", score: 0 }, { key: "B", text: "Uglavnom sličan", score: 3 }, { key: "C", text: "Stabilan", score: 5 }] },
    { id: "P2.2", module: "FLOW", text: "Kako novi član tima preuzima klijente ili projekte?", options: [{ key: "A", text: "Duže uz podršku", score: 0 }, { key: "B", text: "Postepeno", score: 3 }, { key: "C", text: "Brzo samostalno", score: 5 }] },
    { id: "P3.1", module: "MOVE", text: "Koliko imate pregled nad statusom projekata?", options: [{ key: "A", text: "Ograničen", score: 0 }, { key: "B", text: "Delimičan", score: 3 }, { key: "C", text: "Jasan", score: 5 }] },
    { id: "P3.2", module: "MOVE", text: "Kada klijent pita za status:", options: [{ key: "A", text: "Proverimo pa se javimo", score: 0 }, { key: "B", text: "Damo procenu", score: 3 }, { key: "C", text: "Odmah znamo", score: 5 }] },
    { id: "P4.1", module: "STOCK", text: "Koliko jasno znate kapacitet tima?", options: [{ key: "A", text: "Nije jasno", score: 0 }, { key: "B", text: "Delimično", score: 3 }, { key: "C", text: "Jasno", score: 5 }] },
    { id: "P4.2", module: "STOCK", text: "Koliko često dolazi do zagušenja u radu?", options: [{ key: "A", text: "Često", score: 0 }, { key: "B", text: "Povremeno", score: 3 }, { key: "C", text: "Retko", score: 5 }] },
    { id: "P5.1", module: "TRACK", text: "Kako pratite rezultate poslovanja?", options: [{ key: "A", text: "Kada se pojavi potreba", score: 0 }, { key: "B", text: "Povremeno", score: 3 }, { key: "C", text: "Redovno", score: 5 }] },
    { id: "P5.2", module: "TRACK", text: "Koliko brzo možete da sagledate kako ide mesec?", options: [{ key: "A", text: "Treba vreme da proverimo", score: 0 }, { key: "B", text: "Imamo okvirnu sliku", score: 3 }, { key: "C", text: "Vidimo odmah", score: 5 }] },
    { id: "P5.3", module: "TRACK", text: "Koliko vam je jasno koji klijenti donose najviše prihoda?", options: [{ key: "A", text: "Nije jasno", score: 0 }, { key: "B", text: "Delimično", score: 3 }, { key: "C", text: "Jasno", score: 5 }] },
    ...OPS_QUESTIONS_SR, ...RISK_QUESTIONS_SR,
  ],
  Transport: [
    { id: "P1.1", module: "PLAN", text: "Kako planirate rute i raspored vožnji?", options: [{ key: "A", text: "U hodu, prema situaciji", score: 0 }, { key: "B", text: "Imamo okvir koji prilagođavamo", score: 3 }, { key: "C", text: "Imamo plan koji uglavnom pratimo", score: 5 }] },
    { id: "P1.2", module: "PLAN", text: "Koliko je vozačima i timu jasno šta voze i kada?", options: [{ key: "A", text: "Dogovaramo se u hodu", score: 0 }, { key: "B", text: "Uglavnom je jasno uz dopune", score: 3 }, { key: "C", text: "Jasno je definisano unapred", score: 5 }] },
    { id: "P2.1", module: "FLOW", text: "Koliko je tok od prijema naloga do realizacije vožnje ujednačen?", options: [{ key: "A", text: "Često se razlikuje", score: 0 }, { key: "B", text: "Uglavnom je sličan", score: 3 }, { key: "C", text: "Stabilan je", score: 5 }] },
    { id: "P2.2", module: "FLOW", text: "Kako novi vozač ili dispečer ulazi u posao?", options: [{ key: "A", text: "Duže radi uz podršku", score: 0 }, { key: "B", text: "Postepeno se osamostaljuje", score: 3 }, { key: "C", text: "Brzo radi samostalno", score: 5 }] },
    { id: "P3.1", module: "MOVE", text: "Koliko imate pregled gde su vozila u toku dana?", options: [{ key: "A", text: "Ograničen pregled", score: 0 }, { key: "B", text: "Delimičan pregled", score: 3 }, { key: "C", text: "Jasan pregled", score: 5 }] },
    { id: "P3.2", module: "MOVE", text: "Kada klijent pita za status isporuke:", options: [{ key: "A", text: "Proverimo pa se javimo", score: 0 }, { key: "B", text: "Damo okvirnu informaciju", score: 3 }, { key: "C", text: "Odmah znamo", score: 5 }] },
    { id: "P4.1", module: "STOCK", text: "Koliko jasno znate raspoloživ kapacitet (vozila i vozača)?", options: [{ key: "A", text: "Nije jasno", score: 0 }, { key: "B", text: "Imamo okvirnu sliku", score: 3 }, { key: "C", text: "Jasno znamo", score: 5 }] },
    { id: "P4.2", module: "STOCK", text: "Koliko često dolazi do kašnjenja zbog organizacije ili resursa?", options: [{ key: "A", text: "Često", score: 0 }, { key: "B", text: "Povremeno", score: 3 }, { key: "C", text: "Retko", score: 5 }] },
    { id: "P5.1", module: "TRACK", text: "Kako pratite realizaciju vožnji i isporuka?", options: [{ key: "A", text: "Kada se pojavi potreba", score: 0 }, { key: "B", text: "Povremeno", score: 3 }, { key: "C", text: "Redovno", score: 5 }] },
    { id: "P5.2", module: "TRACK", text: "Koliko brzo možete da sagledate stanje isporuka danas?", options: [{ key: "A", text: "Treba vreme da proverimo", score: 0 }, { key: "B", text: "Imamo okvirnu sliku", score: 3 }, { key: "C", text: "Vidimo odmah", score: 5 }] },
    { id: "P5.3", module: "TRACK", text: "Koliko vam je jasno koje vožnje ili rute donose najviše prihoda?", options: [{ key: "A", text: "Nije jasno", score: 0 }, { key: "B", text: "Delimično", score: 3 }, { key: "C", text: "Jasno", score: 5 }] },
    ...OPS_QUESTIONS_SR, ...RISK_QUESTIONS_SR,
  ],
  Projekti: [
    { id: "P1.1", module: "PLAN", text: "Kako planirate projekte i rokove?", options: [{ key: "A", text: "U hodu", score: 0 }, { key: "B", text: "Delimično unapred", score: 3 }, { key: "C", text: "Plan postoji i uglavnom se prati", score: 5 }] },
    { id: "P1.2", module: "PLAN", text: "Koliko je timu jasno šta se radi i do kada?", options: [{ key: "A", text: "Dogovaramo se u hodu", score: 0 }, { key: "B", text: "Uglavnom je jasno uz dopune", score: 3 }, { key: "C", text: "Jasno je definisano svima", score: 5 }] },
    { id: "P2.1", module: "FLOW", text: "Koliko je način izvođenja radova ujednačen između projekata?", options: [{ key: "A", text: "Često se razlikuje", score: 0 }, { key: "B", text: "Uglavnom je sličan", score: 3 }, { key: "C", text: "Stabilan je", score: 5 }] },
    { id: "P2.2", module: "FLOW", text: "Kako novi radnik ulazi u posao na projektu?", options: [{ key: "A", text: "Duže radi uz podršku", score: 0 }, { key: "B", text: "Postepeno se osamostaljuje", score: 3 }, { key: "C", text: "Brzo radi samostalno", score: 5 }] },
    { id: "P3.1", module: "MOVE", text: "Koliko imate pregled nad napretkom radova?", options: [{ key: "A", text: "Ograničen pregled", score: 0 }, { key: "B", text: "Delimičan pregled", score: 3 }, { key: "C", text: "Jasan pregled", score: 5 }] },
    { id: "P3.2", module: "MOVE", text: "Kada klijent ili investitor pita za status projekta:", options: [{ key: "A", text: "Proverimo pa se javimo", score: 0 }, { key: "B", text: "Damo okvirnu procenu", score: 3 }, { key: "C", text: "Odmah znamo", score: 5 }] },
    { id: "P4.1", module: "STOCK", text: "Koliko često imate materijal ili resurse kada su potrebni?", options: [{ key: "A", text: "Često kasni", score: 0 }, { key: "B", text: "Povremeno kasni", score: 3 }, { key: "C", text: "Uglavnom je dostupno", score: 5 }] },
    { id: "P4.2", module: "STOCK", text: "Koliko je nabavka usklađena sa tokom radova?", options: [{ key: "A", text: "Često ne prati radove", score: 0 }, { key: "B", text: "Delimično usklađena", score: 3 }, { key: "C", text: "Dobro usklađena", score: 5 }] },
    { id: "P5.1", module: "TRACK", text: "Kako pratite troškove i napredak po projektu?", options: [{ key: "A", text: "Kada se pojavi potreba", score: 0 }, { key: "B", text: "Povremeno", score: 3 }, { key: "C", text: "Redovno", score: 5 }] },
    { id: "P5.2", module: "TRACK", text: "Koliko brzo možete da sagledate stanje projekta?", options: [{ key: "A", text: "Treba vreme da proverimo", score: 0 }, { key: "B", text: "Imamo okvirnu sliku", score: 3 }, { key: "C", text: "Vidimo odmah", score: 5 }] },
    { id: "P5.3", module: "TRACK", text: "Koliko vam je jasno gde projekti odstupaju od plana?", options: [{ key: "A", text: "Nije jasno", score: 0 }, { key: "B", text: "Delimično jasno", score: 3 }, { key: "C", text: "Jasno", score: 5 }] },
    ...OPS_QUESTIONS_SR, ...RISK_QUESTIONS_SR,
  ],
  Mesovito: [
    { id: "P1.1", module: "PLAN", text: "Kako planirate poslovanje za naredni period?", options: [{ key: "A", text: "Radimo po potrebi", score: 0 }, { key: "B", text: "Postoji okvir koji retko pratimo", score: 3 }, { key: "C", text: "Plan postoji i tim ga prati", score: 5 }] },
    { id: "P1.2", module: "PLAN", text: "Da li tim zna ciljeve i rokove?", options: [{ key: "A", text: "Ne jasno", score: 0 }, { key: "B", text: "Delimično", score: 3 }, { key: "C", text: "Jasno i merljivo", score: 5 }] },
    { id: "P2.1", module: "FLOW", text: "Da li su ključni procesi opisani i zapisani?", options: [{ key: "A", text: "Sve je u glavi", score: 0 }, { key: "B", text: "Neformalna pravila, nezapisana", score: 3 }, { key: "C", text: "Dokumentovano, tim prati", score: 5 }] },
    { id: "P2.2", module: "FLOW", text: "Koliko brzo novi zaposleni počne samostalno da radi?", options: [{ key: "A", text: "Sporo, uz stalnu pomoć", score: 0 }, { key: "B", text: "Snalazi se uz pitanja", score: 3 }, { key: "C", text: "Brzo kroz jasnu proceduru", score: 5 }] },
    { id: "P3.1", module: "MOVE", text: "Kako saznate da nešto kasni ili nije isporučeno?", options: [{ key: "A", text: "Kupac ili klijent nas kontaktira", score: 0 }, { key: "B", text: "Saznamo, ali ne uvek na vreme", score: 3 }, { key: "C", text: "Znamo unapred i reagujemo pre", score: 5 }] },
    { id: "P3.2", module: "MOVE", text: "Kada kupac pita za status:", options: [{ key: "A", text: "Proveravamo pa javljamo", score: 0 }, { key: "B", text: "Dajemo okviran odgovor", score: 3 }, { key: "C", text: "Odmah znamo", score: 5 }] },
    { id: "P4.1", module: "STOCK", text: "Da li znate koliko možete da preuzmete posla ili robe?", options: [{ key: "A", text: "Ne pratimo", score: 0 }, { key: "B", text: "Okvirni osećaj, nije merljivo", score: 3 }, { key: "C", text: "Tačno znamo kapacitete", score: 5 }] },
    { id: "P4.2", module: "STOCK", text: "Koliko često nastaju problemi zbog nedostatka resursa?", options: [{ key: "A", text: "Često", score: 0 }, { key: "B", text: "Povremeno", score: 3 }, { key: "C", text: "Retko", score: 5 }] },
    { id: "P5.1", module: "TRACK", text: "Kako pratite ključne metrike poslovanja?", options: [{ key: "A", text: "Reagujemo kad krene po zlu", score: 0 }, { key: "B", text: "Pratimo neke, bez sistema", score: 3 }, { key: "C", text: "Redovan pregled ključnih pokazatelja", score: 5 }] },
    { id: "P5.2", module: "TRACK", text: "Možete li odmah reći kako ide ova nedelja?", options: [{ key: "A", text: "Moram da skupim informacije", score: 0 }, { key: "B", text: "Mogu, ali ne odmah brojevima", score: 3 }, { key: "C", text: "Znam odmah", score: 5 }] },
    { id: "P5.3", module: "TRACK", text: "Da li znate koji deo biznisa donosi najviše profita?", options: [{ key: "A", text: "Ne pratim konkretno", score: 0 }, { key: "B", text: "Okvirno znam", score: 3 }, { key: "C", text: "Da, pratim i koristim za odluke", score: 5 }] },
    ...OPS_QUESTIONS_SR, ...RISK_QUESTIONS_SR,
  ],
}

const QUESTIONS_BY_INDUSTRY_EN: Record<Industry, Question[]> = {
  Proizvodnja: [
    { id: "P1.1", module: "PLAN", text: "How do you usually plan production for the next period?", options: [{ key: "A", text: "On the fly, based on orders", score: 0 }, { key: "B", text: "We have a framework we adjust", score: 3 }, { key: "C", text: "We have a plan we mostly follow", score: 5 }] },
    { id: "P1.2", module: "PLAN", text: "How clear is it to the team what needs to be produced and by when?", options: [{ key: "A", text: "We mostly figure it out as we go", score: 0 }, { key: "B", text: "There's a framework, with extra explanations", score: 3 }, { key: "C", text: "Clearly defined for everyone", score: 5 }] },
    { id: "P2.1", module: "FLOW", text: "How consistent is production output across shifts or batches?", options: [{ key: "A", text: "Often varies", score: 0 }, { key: "B", text: "Mostly consistent", score: 3 }, { key: "C", text: "Stable", score: 5 }] },
    { id: "P2.2", module: "FLOW", text: "How does a new employee get up to speed?", options: [{ key: "A", text: "Takes longer with ongoing support", score: 0 }, { key: "B", text: "Gradually becomes independent", score: 3 }, { key: "C", text: "Quickly works independently", score: 5 }] },
    { id: "P3.1", module: "MOVE", text: "How do you usually find out a delivery is late?", options: [{ key: "A", text: "Usually when the client contacts us", score: 0 }, { key: "B", text: "We notice during the delivery", score: 3 }, { key: "C", text: "We have visibility in advance", score: 5 }] },
    { id: "P3.2", module: "MOVE", text: "When a client asks about order status:", options: [{ key: "A", text: "We check and get back to them", score: 0 }, { key: "B", text: "We give a rough estimate", score: 3 }, { key: "C", text: "We know immediately", score: 5 }] },
    { id: "P4.1", module: "STOCK", text: "How clearly do you know your production capacity for the next period?", options: [{ key: "A", text: "Hard to estimate", score: 0 }, { key: "B", text: "We have a rough picture", score: 3 }, { key: "C", text: "We know clearly", score: 5 }] },
    { id: "P4.2", module: "STOCK", text: "How often does production stop due to material shortages?", options: [{ key: "A", text: "Often", score: 0 }, { key: "B", text: "Occasionally", score: 3 }, { key: "C", text: "Rarely", score: 5 }] },
    { id: "P5.1", module: "TRACK", text: "How do you track production performance?", options: [{ key: "A", text: "When a problem comes up", score: 0 }, { key: "B", text: "We check periodically", score: 3 }, { key: "C", text: "We monitor regularly", score: 5 }] },
    { id: "P5.2", module: "TRACK", text: "How quickly can you see how production is going this week?", options: [{ key: "A", text: "Takes time to check", score: 0 }, { key: "B", text: "We have a rough picture", score: 3 }, { key: "C", text: "We see it immediately", score: 5 }] },
    { id: "P5.3", module: "TRACK", text: "How clear is your profit per product?", options: [{ key: "A", text: "Not clear", score: 0 }, { key: "B", text: "Partially clear", score: 3 }, { key: "C", text: "Clear", score: 5 }] },
    ...OPS_QUESTIONS_EN, ...RISK_QUESTIONS_EN,
  ],
  Distribucija: [
    { id: "P1.1", module: "PLAN", text: "How do you plan procurement?", options: [{ key: "A", text: "As needed", score: 0 }, { key: "B", text: "Partially in advance", score: 3 }, { key: "C", text: "A plan exists and is followed", score: 5 }] },
    { id: "P1.2", module: "PLAN", text: "Does the team know the sales and inventory targets?", options: [{ key: "A", text: "Not really", score: 0 }, { key: "B", text: "Partially", score: 3 }, { key: "C", text: "Clearly knows", score: 5 }] },
    { id: "P2.1", module: "FLOW", text: "How consistent is the order flow from receipt to delivery?", options: [{ key: "A", text: "Often varies", score: 0 }, { key: "B", text: "Mostly similar", score: 3 }, { key: "C", text: "Stable", score: 5 }] },
    { id: "P2.2", module: "FLOW", text: "How does a new employee get up to speed?", options: [{ key: "A", text: "Takes longer with ongoing support", score: 0 }, { key: "B", text: "Gradually becomes independent", score: 3 }, { key: "C", text: "Quickly works independently", score: 5 }] },
    { id: "P3.1", module: "MOVE", text: "How much visibility do you have on goods during delivery?", options: [{ key: "A", text: "Limited visibility", score: 0 }, { key: "B", text: "Partial visibility", score: 3 }, { key: "C", text: "Clear visibility", score: 5 }] },
    { id: "P3.2", module: "MOVE", text: "When a client asks about delivery status:", options: [{ key: "A", text: "We check and get back to them", score: 0 }, { key: "B", text: "We give an estimate", score: 3 }, { key: "C", text: "We know immediately", score: 5 }] },
    { id: "P4.1", module: "STOCK", text: "How often are you out of stock on items clients request?", options: [{ key: "A", text: "Often", score: 0 }, { key: "B", text: "Occasionally", score: 3 }, { key: "C", text: "Rarely", score: 5 }] },
    { id: "P4.2", module: "STOCK", text: "How clearly do you know the cause of stock surplus or shortage?", options: [{ key: "A", text: "Not clear", score: 0 }, { key: "B", text: "Partially clear", score: 3 }, { key: "C", text: "Clear", score: 5 }] },
    { id: "P5.1", module: "TRACK", text: "How do you track inventory levels?", options: [{ key: "A", text: "When a need arises", score: 0 }, { key: "B", text: "Periodically", score: 3 }, { key: "C", text: "Regularly", score: 5 }] },
    { id: "P5.2", module: "TRACK", text: "How quickly can you see current stock levels?", options: [{ key: "A", text: "Takes time to check", score: 0 }, { key: "B", text: "We have a rough picture", score: 3 }, { key: "C", text: "Immediately", score: 5 }] },
    { id: "P5.3", module: "TRACK", text: "How clear is it which items generate the most revenue?", options: [{ key: "A", text: "Not clear", score: 0 }, { key: "B", text: "Partially", score: 3 }, { key: "C", text: "Clear", score: 5 }] },
    ...OPS_QUESTIONS_EN, ...RISK_QUESTIONS_EN,
  ],
  Maloprodaja: [
    { id: "P1.1", module: "PLAN", text: "How do you plan sales?", options: [{ key: "A", text: "Day by day", score: 0 }, { key: "B", text: "Partially in advance", score: 3 }, { key: "C", text: "A plan exists", score: 5 }] },
    { id: "P1.2", module: "PLAN", text: "Does the team know the sales targets?", options: [{ key: "A", text: "Not really", score: 0 }, { key: "B", text: "Partially", score: 3 }, { key: "C", text: "Clearly knows", score: 5 }] },
    { id: "P2.1", module: "FLOW", text: "How consistent is the way of working in the store?", options: [{ key: "A", text: "Varies", score: 0 }, { key: "B", text: "Mostly similar", score: 3 }, { key: "C", text: "Stable", score: 5 }] },
    { id: "P2.2", module: "FLOW", text: "How does a new sales person get up to speed?", options: [{ key: "A", text: "Takes longer with ongoing support", score: 0 }, { key: "B", text: "Gradually becomes independent", score: 3 }, { key: "C", text: "Quickly works independently", score: 5 }] },
    { id: "P3.1", module: "MOVE", text: "How do you usually find out a product is unavailable?", options: [{ key: "A", text: "A customer tells us", score: 0 }, { key: "B", text: "We notice during work", score: 3 }, { key: "C", text: "We have advance visibility", score: 5 }] },
    { id: "P3.2", module: "MOVE", text: "When a customer asks for a product:", options: [{ key: "A", text: "We search for it", score: 0 }, { key: "B", text: "We usually know, with a check", score: 3 }, { key: "C", text: "We know immediately", score: 5 }] },
    { id: "P4.1", module: "STOCK", text: "How often are you out of a requested product?", options: [{ key: "A", text: "Often", score: 0 }, { key: "B", text: "Occasionally", score: 3 }, { key: "C", text: "Rarely", score: 5 }] },
    { id: "P4.2", module: "STOCK", text: "How clearly do you know which products are slow movers?", options: [{ key: "A", text: "Not clear", score: 0 }, { key: "B", text: "Partially", score: 3 }, { key: "C", text: "Clear", score: 5 }] },
    { id: "P5.1", module: "TRACK", text: "How do you track sales?", options: [{ key: "A", text: "When a need arises", score: 0 }, { key: "B", text: "Periodically", score: 3 }, { key: "C", text: "Regularly", score: 5 }] },
    { id: "P5.2", module: "TRACK", text: "How quickly can you see today's turnover?", options: [{ key: "A", text: "Takes time", score: 0 }, { key: "B", text: "We have a rough picture", score: 3 }, { key: "C", text: "Immediately", score: 5 }] },
    { id: "P5.3", module: "TRACK", text: "How clear is it which products generate the most profit?", options: [{ key: "A", text: "Not clear", score: 0 }, { key: "B", text: "Partially", score: 3 }, { key: "C", text: "Clear", score: 5 }] },
    ...OPS_QUESTIONS_EN, ...RISK_QUESTIONS_EN,
  ],
  Usluge: [
    { id: "P1.1", module: "PLAN", text: "How do you plan work with clients and revenue?", options: [{ key: "A", text: "On the fly", score: 0 }, { key: "B", text: "Partially in advance", score: 3 }, { key: "C", text: "A plan exists", score: 5 }] },
    { id: "P1.2", module: "PLAN", text: "Does the team know the goals?", options: [{ key: "A", text: "Not really", score: 0 }, { key: "B", text: "Partially", score: 3 }, { key: "C", text: "Clearly knows", score: 5 }] },
    { id: "P2.1", module: "FLOW", text: "How consistent is the way of working with clients?", options: [{ key: "A", text: "Varies", score: 0 }, { key: "B", text: "Mostly similar", score: 3 }, { key: "C", text: "Stable", score: 5 }] },
    { id: "P2.2", module: "FLOW", text: "How does a new team member take over clients or projects?", options: [{ key: "A", text: "Takes longer with support", score: 0 }, { key: "B", text: "Gradually", score: 3 }, { key: "C", text: "Quickly and independently", score: 5 }] },
    { id: "P3.1", module: "MOVE", text: "How much visibility do you have over project statuses?", options: [{ key: "A", text: "Limited", score: 0 }, { key: "B", text: "Partial", score: 3 }, { key: "C", text: "Clear", score: 5 }] },
    { id: "P3.2", module: "MOVE", text: "When a client asks for a status update:", options: [{ key: "A", text: "We check and get back to them", score: 0 }, { key: "B", text: "We give an estimate", score: 3 }, { key: "C", text: "We know immediately", score: 5 }] },
    { id: "P4.1", module: "STOCK", text: "How clearly do you know your team's capacity?", options: [{ key: "A", text: "Not clear", score: 0 }, { key: "B", text: "Partially", score: 3 }, { key: "C", text: "Clear", score: 5 }] },
    { id: "P4.2", module: "STOCK", text: "How often does bottlenecking occur in your work?", options: [{ key: "A", text: "Often", score: 0 }, { key: "B", text: "Occasionally", score: 3 }, { key: "C", text: "Rarely", score: 5 }] },
    { id: "P5.1", module: "TRACK", text: "How do you track business results?", options: [{ key: "A", text: "When a need arises", score: 0 }, { key: "B", text: "Periodically", score: 3 }, { key: "C", text: "Regularly", score: 5 }] },
    { id: "P5.2", module: "TRACK", text: "How quickly can you see how this month is going?", options: [{ key: "A", text: "Takes time to check", score: 0 }, { key: "B", text: "We have a rough picture", score: 3 }, { key: "C", text: "Immediately", score: 5 }] },
    { id: "P5.3", module: "TRACK", text: "How clear is it which clients generate the most revenue?", options: [{ key: "A", text: "Not clear", score: 0 }, { key: "B", text: "Partially", score: 3 }, { key: "C", text: "Clear", score: 5 }] },
    ...OPS_QUESTIONS_EN, ...RISK_QUESTIONS_EN,
  ],
  Transport: [
    { id: "P1.1", module: "PLAN", text: "How do you plan routes and schedules?", options: [{ key: "A", text: "On the fly, as situations arise", score: 0 }, { key: "B", text: "We have a framework we adjust", score: 3 }, { key: "C", text: "We have a plan we mostly follow", score: 5 }] },
    { id: "P1.2", module: "PLAN", text: "How clear is it to drivers and the team what they're transporting and when?", options: [{ key: "A", text: "We figure it out as we go", score: 0 }, { key: "B", text: "Mostly clear with some clarifications", score: 3 }, { key: "C", text: "Clearly defined in advance", score: 5 }] },
    { id: "P2.1", module: "FLOW", text: "How consistent is the flow from order receipt to delivery completion?", options: [{ key: "A", text: "Often varies", score: 0 }, { key: "B", text: "Mostly similar", score: 3 }, { key: "C", text: "Stable", score: 5 }] },
    { id: "P2.2", module: "FLOW", text: "How does a new driver or dispatcher get up to speed?", options: [{ key: "A", text: "Takes longer with ongoing support", score: 0 }, { key: "B", text: "Gradually becomes independent", score: 3 }, { key: "C", text: "Quickly works independently", score: 5 }] },
    { id: "P3.1", module: "MOVE", text: "How much visibility do you have on vehicle locations during the day?", options: [{ key: "A", text: "Limited visibility", score: 0 }, { key: "B", text: "Partial visibility", score: 3 }, { key: "C", text: "Clear visibility", score: 5 }] },
    { id: "P3.2", module: "MOVE", text: "When a client asks about delivery status:", options: [{ key: "A", text: "We check and get back to them", score: 0 }, { key: "B", text: "We give a rough estimate", score: 3 }, { key: "C", text: "We know immediately", score: 5 }] },
    { id: "P4.1", module: "STOCK", text: "How clearly do you know available capacity (vehicles and drivers)?", options: [{ key: "A", text: "Not clear", score: 0 }, { key: "B", text: "We have a rough picture", score: 3 }, { key: "C", text: "We know clearly", score: 5 }] },
    { id: "P4.2", module: "STOCK", text: "How often do delays occur due to organization or resource issues?", options: [{ key: "A", text: "Often", score: 0 }, { key: "B", text: "Occasionally", score: 3 }, { key: "C", text: "Rarely", score: 5 }] },
    { id: "P5.1", module: "TRACK", text: "How do you track delivery execution?", options: [{ key: "A", text: "When a need arises", score: 0 }, { key: "B", text: "Periodically", score: 3 }, { key: "C", text: "Regularly", score: 5 }] },
    { id: "P5.2", module: "TRACK", text: "How quickly can you see today's delivery status?", options: [{ key: "A", text: "Takes time to check", score: 0 }, { key: "B", text: "We have a rough picture", score: 3 }, { key: "C", text: "Immediately", score: 5 }] },
    { id: "P5.3", module: "TRACK", text: "How clear is it which routes or runs generate the most revenue?", options: [{ key: "A", text: "Not clear", score: 0 }, { key: "B", text: "Partially", score: 3 }, { key: "C", text: "Clear", score: 5 }] },
    ...OPS_QUESTIONS_EN, ...RISK_QUESTIONS_EN,
  ],
  Projekti: [
    { id: "P1.1", module: "PLAN", text: "How do you plan projects and deadlines?", options: [{ key: "A", text: "On the fly", score: 0 }, { key: "B", text: "Partially in advance", score: 3 }, { key: "C", text: "A plan exists and is mostly followed", score: 5 }] },
    { id: "P1.2", module: "PLAN", text: "How clear is it to the team what needs to be done and by when?", options: [{ key: "A", text: "We figure it out as we go", score: 0 }, { key: "B", text: "Mostly clear with additions", score: 3 }, { key: "C", text: "Clearly defined for everyone", score: 5 }] },
    { id: "P2.1", module: "FLOW", text: "How consistent is the way work is carried out across projects?", options: [{ key: "A", text: "Often varies", score: 0 }, { key: "B", text: "Mostly similar", score: 3 }, { key: "C", text: "Stable", score: 5 }] },
    { id: "P2.2", module: "FLOW", text: "How does a new team member get up to speed on a project?", options: [{ key: "A", text: "Takes longer with ongoing support", score: 0 }, { key: "B", text: "Gradually becomes independent", score: 3 }, { key: "C", text: "Quickly works independently", score: 5 }] },
    { id: "P3.1", module: "MOVE", text: "How much visibility do you have on project progress?", options: [{ key: "A", text: "Limited", score: 0 }, { key: "B", text: "Partial", score: 3 }, { key: "C", text: "Clear", score: 5 }] },
    { id: "P3.2", module: "MOVE", text: "When a client or investor asks about project status:", options: [{ key: "A", text: "We check and get back to them", score: 0 }, { key: "B", text: "We give a rough estimate", score: 3 }, { key: "C", text: "We know immediately", score: 5 }] },
    { id: "P4.1", module: "STOCK", text: "How often do you have materials or resources when needed?", options: [{ key: "A", text: "Often delayed", score: 0 }, { key: "B", text: "Occasionally delayed", score: 3 }, { key: "C", text: "Usually available", score: 5 }] },
    { id: "P4.2", module: "STOCK", text: "How well aligned is procurement with the project workflow?", options: [{ key: "A", text: "Often doesn't match the work", score: 0 }, { key: "B", text: "Partially aligned", score: 3 }, { key: "C", text: "Well aligned", score: 5 }] },
    { id: "P5.1", module: "TRACK", text: "How do you track costs and progress per project?", options: [{ key: "A", text: "When a need arises", score: 0 }, { key: "B", text: "Periodically", score: 3 }, { key: "C", text: "Regularly", score: 5 }] },
    { id: "P5.2", module: "TRACK", text: "How quickly can you see the current status of a project?", options: [{ key: "A", text: "Takes time to check", score: 0 }, { key: "B", text: "We have a rough picture", score: 3 }, { key: "C", text: "Immediately", score: 5 }] },
    { id: "P5.3", module: "TRACK", text: "How clear is it where projects are deviating from plan?", options: [{ key: "A", text: "Not clear", score: 0 }, { key: "B", text: "Partially clear", score: 3 }, { key: "C", text: "Clear", score: 5 }] },
    ...OPS_QUESTIONS_EN, ...RISK_QUESTIONS_EN,
  ],
  Mesovito: [
    { id: "P1.1", module: "PLAN", text: "How do you plan your business for the next period?", options: [{ key: "A", text: "We work as needed", score: 0 }, { key: "B", text: "There's a framework we rarely follow", score: 3 }, { key: "C", text: "A plan exists and the team follows it", score: 5 }] },
    { id: "P1.2", module: "PLAN", text: "Does the team know the goals and deadlines?", options: [{ key: "A", text: "Not clearly", score: 0 }, { key: "B", text: "Partially", score: 3 }, { key: "C", text: "Clearly and measurably", score: 5 }] },
    { id: "P2.1", module: "FLOW", text: "Are key processes described and documented?", options: [{ key: "A", text: "Everything's in people's heads", score: 0 }, { key: "B", text: "Informal rules, not written down", score: 3 }, { key: "C", text: "Documented and followed by the team", score: 5 }] },
    { id: "P2.2", module: "FLOW", text: "How quickly does a new employee start working independently?", options: [{ key: "A", text: "Slowly, with ongoing help", score: 0 }, { key: "B", text: "They manage with questions", score: 3 }, { key: "C", text: "Quickly through a clear procedure", score: 5 }] },
    { id: "P3.1", module: "MOVE", text: "How do you find out something is delayed or not delivered?", options: [{ key: "A", text: "Client or customer contacts us", score: 0 }, { key: "B", text: "We find out, but not always in time", score: 3 }, { key: "C", text: "We know in advance and act before", score: 5 }] },
    { id: "P3.2", module: "MOVE", text: "When a client asks about status:", options: [{ key: "A", text: "We check and get back to them", score: 0 }, { key: "B", text: "We give a rough answer", score: 3 }, { key: "C", text: "We know immediately", score: 5 }] },
    { id: "P4.1", module: "STOCK", text: "Do you know how much work or goods you can take on?", options: [{ key: "A", text: "We don't track it", score: 0 }, { key: "B", text: "A rough sense, not measurable", score: 3 }, { key: "C", text: "We know our capacity exactly", score: 5 }] },
    { id: "P4.2", module: "STOCK", text: "How often do problems arise due to resource shortages?", options: [{ key: "A", text: "Often", score: 0 }, { key: "B", text: "Occasionally", score: 3 }, { key: "C", text: "Rarely", score: 5 }] },
    { id: "P5.1", module: "TRACK", text: "How do you track key business metrics?", options: [{ key: "A", text: "We react when things go wrong", score: 0 }, { key: "B", text: "We track some, without a system", score: 3 }, { key: "C", text: "Regular review of key indicators", score: 5 }] },
    { id: "P5.2", module: "TRACK", text: "Can you immediately say how this week is going?", options: [{ key: "A", text: "I need to gather information", score: 0 }, { key: "B", text: "I can, but not immediately in numbers", score: 3 }, { key: "C", text: "I know immediately", score: 5 }] },
    { id: "P5.3", module: "TRACK", text: "Do you know which part of the business generates the most profit?", options: [{ key: "A", text: "I don't track it specifically", score: 0 }, { key: "B", text: "Roughly", score: 3 }, { key: "C", text: "Yes, I track it and use it for decisions", score: 5 }] },
    ...OPS_QUESTIONS_EN, ...RISK_QUESTIONS_EN,
  ],
}

type Phase = "idle" | "url" | "onboarding" | "survey" | "extra" | "analyzing" | "email" | "sending" | "chat" | "closing" | "done"

interface Message {
  role: "mima" | "user"
  text: string
  options?: { key: string; text: string }[]
  isTyping?: boolean
  isSession?: boolean
}

interface SurveyData {
  name: string
  company: string
  industry: string
  employees: string
  whatTheyMake: string
  yearsExist: string
  answers: { questionId: string; module: string; score: number; answerText: string }[]
  extra: string
}

const MODULE_MAX: Record<string, number> = {
  PLAN: 10, FLOW: 10, MOVE: 10, STOCK: 10, TRACK: 15, OPS: 15, RISK: 15
}

function getModuleSemafor(moduleId: string, score: number): "red" | "yellow" | "green" {
  const max = MODULE_MAX[moduleId] || 10
  if (max === 10) {
    if (score <= 4) return "red"
    if (score <= 7) return "yellow"
    return "green"
  } else {
    if (score <= 6) return "red"
    if (score <= 11) return "yellow"
    return "green"
  }
}

function calculateScores(answers: SurveyData["answers"], modules: typeof MODULES_SR) {
  const moduleScores: Record<string, number> = {}
  modules.forEach(m => { moduleScores[m.id] = 0 })
  answers.forEach(a => { moduleScores[a.module] += a.score })
  const operativniSkor = answers.reduce((s, a) => s + a.score, 0)
  let konzistencija = 0
  modules.forEach(m => {
    const semafor = getModuleSemafor(m.id, moduleScores[m.id])
    if (semafor === "yellow") konzistencija += 2
    else if (semafor === "green") konzistencija += 1
  })
  const icpIndeks = operativniSkor + konzistencija
  const icpPercent = Math.round((icpIndeks / 99) * 100)
  let icpZona: "nije" | "light" | "full" | "validacija"
  if (icpIndeks <= 39) icpZona = "nije"
  else if (icpIndeks <= 54) icpZona = "light"
  else if (icpIndeks <= 74) icpZona = "full"
  else icpZona = "validacija"
  const semafori: Record<string, "red" | "yellow" | "green"> = {}
  modules.forEach(m => { semafori[m.id] = getModuleSemafor(m.id, moduleScores[m.id]) })
  const stableModules = Object.values(semafori).filter(s => s !== "red").length
  const sortedModules = modules.map(m => ({
    id: m.id, name: m.name, score: moduleScores[m.id], max: MODULE_MAX[m.id],
    semafor: semafori[m.id], pct: Math.round((moduleScores[m.id] / MODULE_MAX[m.id]) * 100)
  })).sort((a, b) => a.pct - b.pct)
  return { operativniSkor, konzistencija, icpIndeks, icpPercent, icpZona, semafori, moduleScores, stableModules, sortedModules }
}

function useTypingMessage() {
  // Queue ensures messages appear sequentially, never overlapping
  const queue: Array<{ text: string; options?: Message["options"]; delay: number }> = []
  let isProcessing = false

  const processQueue = (setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
    if (isProcessing || queue.length === 0) return
    isProcessing = true
    const { text, options, delay } = queue.shift()!
    setMessages(prev => [...prev, { role: "mima", text: "", isTyping: true }])
    setTimeout(() => {
      setMessages(prev => [...prev.filter(m => !m.isTyping), { role: "mima", text, options }])
      isProcessing = false
      processQueue(setMessages)
    }, delay)
  }

  const addMessageWithDelay = (
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    text: string, options?: Message["options"], delay = 900
  ) => {
    queue.push({ text, options, delay })
    processQueue(setMessages)
  }
  return addMessageWithDelay
}

function ReportVisual({ rd, isSR }: { rd: { scores: ReturnType<typeof calculateScores>, uvod: string, nalazi: string[], pozitivno: string, preporuka: string }, isSR: boolean }) {
  const { scores } = rd
  const semaforColor = { red: "#E53935", yellow: "#F59E0B", green: "#22C55E" }
  const zoneColor = scores.icpZona === "nije" ? "#E53935" : scores.icpZona === "light" ? "#F59E0B" : scores.icpZona === "full" ? "#22C55E" : "#3B82F6"
  const zoneLabel = scores.icpZona === "nije" ? "Kritično" : scores.icpZona === "light" ? "Light" : scores.icpZona === "full" ? "Full" : "Validacija"
  return (
    <div style={{ backgroundColor: '#0B1929', border: '1px solid rgba(13,115,119,0.5)', borderRadius: '12px', padding: '12px', margin: '4px 0' }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '0.12em', marginBottom: '8px' }}>IZVEŠTAJ O OPERATIVNOM STANJU</p>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ color: 'white', fontSize: '22px', fontWeight: 700 }}>{scores.icpIndeks}</span>
          <span style={{ color: zoneColor, fontSize: '12px', fontWeight: 600, backgroundColor: `${zoneColor}22`, padding: '3px 10px', borderRadius: '20px' }}>{zoneLabel}</span>
        </div>
        <div style={{ position: 'relative', height: '8px', borderRadius: '4px', background: 'linear-gradient(to right, #E53935 0%, #E53935 40%, #F59E0B 40%, #F59E0B 55%, #22C55E 55%, #22C55E 75%, #3B82F6 75%, #3B82F6 100%)', marginBottom: '4px' }}>
          <div style={{ position: 'absolute', top: '-4px', left: `${scores.icpPercent}%`, transform: 'translateX(-50%)', width: '4px', height: '16px', backgroundColor: 'white', borderRadius: '2px', boxShadow: '0 0 4px rgba(0,0,0,0.5)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px' }}>0</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px' }}>99</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', marginBottom: '4px' }}>Operativni skor</p>
          <p style={{ color: 'white', fontSize: '17px', fontWeight: 700 }}>{scores.operativniSkor}<span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>/85</span></p>
        </div>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', marginBottom: '4px' }}>Stabilnost</p>
          <p style={{ color: 'white', fontSize: '17px', fontWeight: 700 }}>{scores.stableModules}<span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>/7</span></p>
        </div>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '0.08em', marginBottom: '6px' }}>MODULI</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {scores.sortedModules.map(m => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: semaforColor[m.semafor], fontSize: '8px' }}>●</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', width: '80px' }}>{m.name}</span>
              <div style={{ flex: 1, height: '4px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: `${m.pct}%`, backgroundColor: semaforColor[m.semafor], borderRadius: '2px' }} />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', width: '30px', textAlign: 'right' }}>{m.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '10px' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', letterSpacing: '0.08em', marginBottom: '6px' }}>TRENUTNO NAJVEĆI RIZIK</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {scores.sortedModules.slice(0, 2).map(m => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#E53935', fontSize: '10px' }}>●</span>
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px' }}>{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MimaSurvey({ onStart, welcomeMessage, leadIzvor }: { onStart?: () => void, welcomeMessage?: string, leadIzvor?: string }) {
  const { lang } = useLang()
  const [phase, setPhase] = useState<Phase>("idle")
  const [sessionId] = useState<string>(() => Math.random().toString(36).slice(2) + Date.now().toString(36))
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [surveyData, setSurveyData] = useState<SurveyData>({ name: "", company: "", industry: "", employees: "", whatTheyMake: "", yearsExist: "", answers: [], extra: "" })
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [report, setReport] = useState("")
  const [reportData, setReportData] = useState<{ scores: ReturnType<typeof calculateScores>, uvod: string, nalazi: string[], pozitivno: string, preporuka: string } | null>(null)
  const [chatCount, setChatCount] = useState(0)
  const [consecutiveLow, setConsecutiveLow] = useState(0)
  const [urlInput, setUrlInput] = useState("")
  const [urlAnalyzed, setUrlAnalyzed] = useState(false)
  const [sessionActive, setSessionActive] = useState(false)
  const vocativeRef = useRef<string>('')
  const closingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const surveyDataRef = useRef<SurveyData>(surveyData)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatStartIndexRef = useRef<number>(0)
  const emailRef = useRef<string>('')
  const messagesRef = useRef<Message[]>([])
  const reportDataRef = useRef<typeof reportData>(null)
  const addMessageWithDelay = useTypingMessage()

  const isSR = lang === "SR"

  useEffect(() => { surveyDataRef.current = surveyData }, [surveyData])
  useEffect(() => { messagesRef.current = messages }, [messages])
  useEffect(() => { if (reportData) reportDataRef.current = reportData }, [reportData])
  useEffect(() => { 
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    // Extra delayed scroll for after report visual renders (it's tall)
    const t = setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 800)
    return () => clearTimeout(t)
  }, [messages])

  // Listen for navbar CTA trigger
  useEffect(() => {
    const handler = () => { if (phase === "idle") startChat() }
    window.addEventListener("mima:start", handler)
    return () => window.removeEventListener("mima:start", handler)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // Early abandoned tracking — fires when user closes tab/browser mid-session
  useEffect(() => {
    const handleBeforeUnload = () => {
      const currentPhase = phase
      // Only track if session has started but not finished
      if (currentPhase === "idle" || currentPhase === "done") return
      const sd = surveyDataRef.current
      const rd = reportDataRef.current
      // Use sendBeacon for reliability on page unload (fetch won't complete)
      const payload = {
        sessionId,
        event: "name",
        type: "abandoned",
        name: sd.name || "",
        company: sd.company || sd.whatTheyMake || "",
        industry: sd.industry || "",
        employees: String(sd.employees || ""),
        staoNaFazi: currentPhase,
        dopsSkor: String(rd?.scores?.icpIndeks ?? ""),
        icpZona: rd?.scores?.icpZona ?? "",
        dosaoDoCata: (currentPhase === "chat" || currentPhase === "closing") ? "Da" : "Ne",
        docekaoKraj: "Ne",
      }
      navigator.sendBeacon("/api/crm-entry", JSON.stringify(payload))
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [phase, sessionId])

  const addUserMessage = (text: string) => setMessages(prev => [...prev, { role: "user", text }])
  const addMimaMessage = (text: string, options?: Message["options"], delay = 900) => addMessageWithDelay(setMessages, text, options, delay)
  const addTyping = () => setMessages(prev => [...prev, { role: "mima", text: "", isTyping: true }])
  const removeTyping = () => setMessages(prev => prev.filter(m => !m.isTyping))

  const sendCrmEntry = async (payload: Record<string, unknown>) => {
    try {
      await fetch("/api/crm-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, sessionId })
      })
    } catch (e) {
      console.error("CRM entry error:", e)
    }
  }

  const startChat = () => {
    onStart?.()
    setPhase("onboarding")
    setMessages([{ role: "mima", text: "", isTyping: true }])
    setTimeout(() => {
      setMessages([{ role: "mima", text: isSR
        ? (welcomeMessage || "Spremna sam. ⚡ Kako se Vi zovete?")
        : "I'm MIMA, your NiStor assistant — always on operations, ready to act. ⚡ What's your name?" }])
    }, 800)
  }

  const [interjectDone, setInterjectDone] = useState(false)

  const getIndustryComment = (industry: string): string => {
    const map: Record<string, string> = {
      "Proizvodnja": "Do sada vidim standardan obrazac — planiranje i kontrola kvaliteta su uvek prve tačke pritiska u proizvodnji ovog profila.",
      "Distribucija": "Ovo je tipičan profil za distribuciju u ovom segmentu — zalihe i isporuka su uvek u tenziji.",
      "Maloprodaja": "Prepoznajem ovaj obrazac — u maloprodaji ovog obima tok robe i organizacija tima su uvek prva dva čvora.",
      "Transport": "Standardan profil za prevoznike ovog tipa — koordinacija i rokovi su konstantna tačka pritiska.",
      "Usluge": "Do sada vidim poznatu sliku — u uslugama ovog profila organizacija i praćenje su uvek prve pukotine.",
      "Projekti": "Prepoznajem ovaj profil — u projektnom radu planiranje i kapacitet su uvek u konfliktu.",
    }
    return map[industry] || "Do sada vidim standardan obrazac za firme ovog profila."
  }

  const getIndustryCommentEN = (industry: string): string => {
    const map: Record<string, string> = {
      "Proizvodnja": "I see a familiar pattern — planning and quality control are always the first pressure points in manufacturing at this scale.",
      "Distribucija": "This is a typical profile for distribution in this segment — inventory and delivery are always in tension.",
      "Maloprodaja": "I recognize this pattern — in retail at this volume, stock flow and team organization are always the first two knots.",
      "Transport": "Standard profile for carriers of this type — coordination and deadlines are a constant pressure point.",
      "Usluge": "I see a familiar picture — in services at this profile, organization and tracking are always the first cracks.",
      "Projekti": "I recognize this profile — in project-based work, planning and capacity are always in conflict.",
    }
    return map[industry] || "I see a standard pattern for companies at this profile."
  }

  const getAIComment = (_question: Question, _answer: Question["options"][0], _data: SurveyData, currentIndex: number, questions: Question[], consecutiveLow: number) => {
    const nextIndex = currentIndex + 1
    const isQ9 = currentIndex === 8 // posle 9. pitanja (index 8)

    // Uslov za komentar: 3 teška zaredom ILI pitanje 9 (ako nije već bio komentar)
    const shouldInject = !interjectDone && (consecutiveLow >= 3 || isQ9)

    if (shouldInject) {
      setInterjectDone(true)
      const commentSR = consecutiveLow >= 3
        ? "Ovo nije retko — većina firmi ovog profila prolazi kroz istu tačku. Nastavimo."
        : getIndustryComment(_data.industry)
      const commentEN = consecutiveLow >= 3
        ? "This is not unusual — most companies at this stage go through the same point. Let's continue."
        : getIndustryCommentEN(_data.industry)

      addMimaMessage(isSR ? commentSR : commentEN, undefined, 600)

      if (nextIndex < questions.length) {
        const nextQ = questions[nextIndex]
        addMimaMessage(nextQ.text, nextQ.options.map(o => ({ key: o.key, text: o.text })), 1800)
        setQuestionIndex(nextIndex)
      } else {
        setTimeout(() => {
          addMimaMessage(isSR
            ? "Jedno poslednje pitanje — ima li nešto što Vas trenutno muči u poslovanju, a nismo pokrili ovim pitanjima?"
            : "One last question — is there anything currently troubling you in the business that we haven't covered?", undefined, 1800)
          setPhase("extra")
        }, 0)
      }
      return
    }

    if (nextIndex < questions.length) {
      const nextQ = questions[nextIndex]
      addMimaMessage(nextQ.text, nextQ.options.map(o => ({ key: o.key, text: o.text })), 400)
      setQuestionIndex(nextIndex)
    } else {
      addMimaMessage(isSR
        ? "Jedno poslednje pitanje — ima li nešto što Vas trenutno muči u poslovanju, a nismo pokrili ovim pitanjima?"
        : "One last question — is there anything currently troubling you in the business that we haven't covered?", undefined, 400)
      setPhase("extra")
    }
  }
  const generateReport = async (data: SurveyData, voc: string = "") => {
    setPhase("analyzing")
    addTyping()
    const scores = calculateScores(data.answers, isSR ? MODULES_SR : MODULES_EN)
    const worstTwo = scores.sortedModules.slice(0, 2)
    const bestModule = scores.sortedModules[scores.sortedModules.length - 1]
    const systemPromptSR = [
      "Ti si MIMA — AI COO NiStora. Pišeš kratak dijagnostički izveštaj za vlasnika MSP-a na osnovu njegovih odgovora.",
      "CILJ: Vlasnik treba da pročita nalaz i kaže 'tačno tako' — da se prepozna, ne da dobije zadacu.",
      "Ne daješ rešenja. Daješ dijagnozu.",
      "",
      "Ton: topao, direktan, bez laskanja, bez žargona. Pišeš kao kolega koji vidi sistem iznutra.",
      "Normalizuj problem — nije greška vlasnika, to je faza u kojoj se firma nalazi.",
      "Svaki nalaz prilagodi konkretnoj industriji i veličini firme iz konteksta.",
      "",
      "Za svaki nalaz:",
      "- Rečenica 1: šta konkretno vidimo (iz odgovora, ne generički)",
      "- Rečenica 2: zašto je to uobičajeno za firme ovog profila",
      "- Rečenica 3: kakva je posledica — vlasnik treba da se prepozna u bolu, ne u grešci",
      "",
      "Za pozitivno: kratko i konkretno — ne uteha, vec činjenica koja odvaja.",
      "",
      "Odgovori SAMO validnim JSON-om, bez teksta pre ili posle:",
      JSON.stringify({uvod:"jedna rečenica",nalazi:["R1+R2+R3","R1+R2+R3"],pozitivno:"1-2 rečenice",zakljucak:"Ovo je inicijalni nalaz. Šta se zaista dešava ispod površine, otkriva se tek kroz Skener."})
    ].join("\n")
    const systemPromptEN = [
      "You are MIMA — AI COO of NiStor. You write a short diagnostic report for an SME owner based on their answers.",
      "GOAL: The owner reads this and says that is exactly it — they recognize themselves, not a to-do list.",
      "No solutions. Diagnosis only.",
      "",
      "Tone: warm, direct, no flattery, no jargon. Write like a colleague who sees the system from the inside.",
      "Normalize the problem — not the owner fault, it is the stage the company is in.",
      "Adapt every finding to the specific industry and company size.",
      "",
      "For each finding:",
      "- Sentence 1: what we specifically see (from answers, not generic)",
      "- Sentence 2: why this is common for companies at this stage",
      "- Sentence 3: what the consequence is — owner should recognize the pain, not feel blamed",
      "",
      "For pozitivno: brief and concrete — not consolation, but a real differentiator.",
      "",
      "Reply ONLY with valid JSON, no text before or after:",
      JSON.stringify({uvod:"one sentence",nalazi:["S1+S2+S3","S1+S2+S3"],pozitivno:"1-2 sentences",zakljucak:"This is an initial finding. What is really happening beneath the surface is revealed only through the Scanner."})
    ].join("\n")
    try {
      const response = await fetch("/api/anthropic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: isSR ? systemPromptSR : systemPromptEN,
          messages: [{ role: "user", content: `Vlasnik: ${data.name}\nFirma: ${data.company}, ${data.industry}, ${data.employees} zaposlenih\nProizvod/usluga: ${data.whatTheyMake}, postoje: ${data.yearsExist}\nICP Indeks: ${scores.icpIndeks}/99 (${scores.icpPercent}%)\nICP Zona: ${scores.icpZona}\nStabilnih modula: ${scores.stableModules}/7\nNajslabiji: ${worstTwo.map(m => `${m.name} (${m.pct}%)`).join(", ")}\nNajjači: ${bestModule.name} (${bestModule.pct}%)\nNapomena vlasnika: ${data.extra || "nije navedeno"}\n\nOdgovori po modulima:\n${data.answers.map(a => `${a.module} [${a.questionId}]: ${a.answerText} (${a.score})`).join("\n")}` }]
        })
      })
      const result = await response.json()
      removeTyping()
      const text = result.content?.[0]?.text || ""
      console.log("MIMA generateReport raw:", text)
      // Extract JSON robustly — strip markdown fences, find first { ... }
      const cleaned = text.replace(/```json|```/g, "").trim()
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error("No JSON found in response")
      console.log("MIMA generateReport JSON match:", jsonMatch[0])
      const parsed = JSON.parse(jsonMatch[0])
      const rd = { scores, uvod: parsed.uvod, nalazi: parsed.nalazi, pozitivno: parsed.pozitivno, preporuka: parsed.preporuka }
      setReportData(rd)
      setReport(parsed.uvod + "\n\nNajveći rizici:\n" + parsed.nalazi.map((n: string) => "· " + n).join("\n") + "\n\nŠta funkcioniše:\n" + parsed.pozitivno)
      setMessages(prev => [...prev, { role: "mima", text: "REPORT_VISUAL" }])
      setTimeout(() => {
        const worst = scores.sortedModules.slice(0, 2).map(m => m.name).join(" i ")
        const zoneCommentSR =
          scores.icpZona === "full"
            ? `${voc || data.name}, solidan rezultat — firma radi, ali ${worst} govore da još uvek previše prolazi kroz Vas. 👆`
            : scores.icpZona === "validacija"
            ? `${voc || data.name}, firma ima osnovu — ali vidim mesta gde energija curi bez povratka. ${worst} su tu najglasniji. 🔧`
            : scores.icpZona === "light"
            ? `${voc || data.name}, ima tu potencijala — sistem samo još nije stigao da ga uhvati. ${worst} su polazna tačka. 🤔`
            : `${voc || data.name}, ovo je čestit rezultat za firmu koja raste bez sistema — i tačno tu počinjemo. ${worst} prvi na redu. 🎯`
        const zoneCommentEN =
          scores.icpZona === "full"
            ? `${voc || data.name}, solid result — the business runs, but ${worst} show too much still goes through you. 👆`
            : scores.icpZona === "validacija"
            ? `${voc || data.name}, the foundation is there — but I see places where energy leaks with no return. ${worst} are the loudest signals. 🔧`
            : scores.icpZona === "light"
            ? `${voc || data.name}, the potential is there — the system just hasn't caught up yet. ${worst} are the starting point. 🤔`
            : `${voc || data.name}, this is an honest result for a company growing without a system — and that's exactly where we start. ${worst} first. 🎯`
        addMimaMessage(isSR ? zoneCommentSR : zoneCommentEN)
        // CRM update — imamo DOPS skor i module
        sendCrmEntry({
          event: "report",
          name: data.name,
          company: data.company,
          industry: data.industry,
          employees: data.employees,
          whatTheyMake: data.whatTheyMake,
          yearsExist: data.yearsExist,
          urlSajt: urlInput,
          answers: data.answers,
          extra: data.extra,
          dopsSkor: String(scores.icpIndeks),
          icpZona: scores.icpZona,
          staoNaFazi: "report",
          dosaoDoCata: "Ne",
          docekaoKraj: "Ne"
        })
      }, 1200)
      setTimeout(() => {
        addMimaMessage(isSR
          ? `Kreiran je kompletan PDF izveštaj. Pošaljite mi Vašu mail adresu da Vam ga prosledim.`
          : `A full PDF report has been created. Send me your email address and I'll forward it to you.`)
        setPhase("email")
      }, 3200)
    } catch (err) {
      console.error("MIMA generateReport error:", err)
      removeTyping()
      const rd = { scores, uvod: "Analiza završena.", nalazi: [`Najslabiji: ${scores.sortedModules.slice(0,2).map(m=>m.name).join(", ")}`], pozitivno: `Najjača oblast: ${scores.sortedModules[scores.sortedModules.length-1].name}`, preporuka: "Kontaktirajte nas." }
      setReportData(rd)
      setReport(rd.uvod)
      setMessages(prev => [...prev, { role: "mima", text: "REPORT_VISUAL" }])
      setTimeout(() => {
        const worst2 = scores.sortedModules.slice(0, 2).map(m => m.name).join(" i ")
        const zoneCommentSR2 =
          scores.icpZona === "full"
            ? `${voc || data.name}, solidan rezultat — firma radi, ali ${worst2} govore da još uvek previše prolazi kroz Vas. 👆`
            : scores.icpZona === "validacija"
            ? `${voc || data.name}, firma ima osnovu — ali vidim mesta gde energija curi bez povratka. ${worst2} su tu najglasniji. 🔧`
            : scores.icpZona === "light"
            ? `${voc || data.name}, ima tu potencijala — sistem samo još nije stigao da ga uhvati. ${worst2} su polazna tačka. 🤔`
            : `${voc || data.name}, ovo je čestit rezultat za firmu koja raste bez sistema — i tačno tu počinjemo. ${worst2} prvi na redu. 🎯`
        const zoneCommentEN2 =
          scores.icpZona === "full"
            ? `${voc || data.name}, solid result — the business runs, but ${worst2} show too much still goes through you. 👆`
            : scores.icpZona === "validacija"
            ? `${voc || data.name}, the foundation is there — but I see places where energy leaks with no return. ${worst2} are the loudest signals. 🔧`
            : scores.icpZona === "light"
            ? `${voc || data.name}, the potential is there — the system just hasn't caught up yet. ${worst2} are the starting point. 🤔`
            : `${voc || data.name}, this is an honest result for a company growing without a system — and that's exactly where we start. ${worst2} first. 🎯`
        addMimaMessage(isSR ? zoneCommentSR2 : zoneCommentEN2)
      }, 1000)
      setTimeout(() => {
        addMimaMessage(isSR
          ? `Kreiran je kompletan PDF izveštaj. Pošaljite mi Vašu mail adresu da Vam ga prosledim.`
          : `A full PDF report has been created. Send me your email address and I'll forward it to you.`)
        setPhase("email")
      }, 3000)
    }
  }

  const sendPdfByEmail = async (toEmail: string, data: SurveyData, rd: typeof reportData) => {
    if (!rd) return false
    const scores = rd.scores
    try {
      const payload = {
        to_email: toEmail,
        name: data.name,
        vocative: vocativeRef.current || data.name,
        company: data.company,
        industry: data.industry,
        employees: data.employees,
        date: new Date().toLocaleDateString('sr-RS', { day: 'numeric', month: 'long', year: 'numeric' }) + '.',
        icp_indeks: scores.icpIndeks,
        icp_zona: scores.icpZona === "nije" ? "Kriticno" : scores.icpZona === "light" ? "Light" : scores.icpZona === "full" ? "Full" : "Validacija",
        stabilnost: scores.stableModules,
        uvod: rd.uvod,
        kriticno_1_naslov: scores.sortedModules[0]?.name || "Oblast 1",
        kriticno_1_tekst: rd.nalazi[0] || "",
        kriticno_2_naslov: scores.sortedModules[1]?.name || "Oblast 2",
        kriticno_2_tekst: rd.nalazi[1] || "",
        komentar: (data.extra && data.extra.trim().length > 2 && !["ne", "no", "nema", "nista", "ništa", "-", "n/a"].includes(data.extra.trim().toLowerCase())) ? data.extra.trim() : "",
        pozitivno_naslov: scores.sortedModules[scores.sortedModules.length - 1]?.name || "Pozitivno",
        pozitivno_tekst: rd.pozitivno || "",
        moduli: scores.sortedModules.map(m => ({ name: m.name, pct: m.pct, semafor: m.semafor }))
      }
      const response = await fetch("/api/generate-pdf", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      const result = await response.json()
      return result.email_sent === true
    } catch { return false }
  }

  const handleOptionSelect = (key: string) => {
    if (isLoading) return
    if (phase === "onboarding" && onboardingStep === 2) {
      const map: Record<string, Industry> = {
        P: "Proizvodnja", D: "Distribucija", M: "Maloprodaja",
        U: "Usluge", T: "Transport", R: "Projekti", X: "Mesovito"
      }
      const displayMapSR: Record<string, string> = {
        P: "Proizvodnja", D: "Distribucija", M: "Maloprodaja",
        U: "Usluge", T: "Transport", R: "Projektni rad", X: "Mešovito"
      }
      const displayMapEN: Record<string, string> = {
        P: "Manufacturing", D: "Distribution / Wholesale", M: "Retail",
        U: "Services", T: "Transport / Logistics", R: "Project-based work", X: "Mixed"
      }
      const industry = map[key] || "Usluge"
      const displayName = (isSR ? displayMapSR : displayMapEN)[key] || industry
      addUserMessage(displayName)
      setSurveyData(prev => ({ ...prev, industry }))
      setOnboardingStep(3)
      addMimaMessage(isSR ? "Koliko zaposlenih ima Vaša firma ukupno?" : "How many employees does your company have in total?")
      return
    }
    if (phase === "survey") {
      const currentQ = activeQuestions[questionIndex]
      const selected = currentQ.options.find(o => o.key === key)
      if (!selected) return
      addUserMessage(selected.text)
      const newAnswer = { questionId: currentQ.id, module: currentQ.module, score: selected.score, answerText: selected.text }
      const updatedData = { ...surveyData, answers: [...surveyData.answers, newAnswer] }
      setSurveyData(updatedData)
      const newConsecutiveLow = selected.score === 0 ? consecutiveLow + 1 : 0
      setConsecutiveLow(newConsecutiveLow)
      getAIComment(currentQ, selected, updatedData, questionIndex, activeQuestions, newConsecutiveLow)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    const text = input.trim()
    setInput("")

    if (phase === "url") {
      const trimmed = text.trim()
      const hasUrl = trimmed.startsWith("http") || trimmed.startsWith("www") || (trimmed.includes(".") && trimmed.length > 5 && !trimmed.toUpperCase().includes("NEMAM") && !trimmed.toUpperCase().includes("NONE"))
      const isSkip = ["nemam", "none", "nastavi", "continue", "nema", "-", ""].includes(trimmed.toLowerCase())

      if (hasUrl) {
        setUrlInput(trimmed)
        addUserMessage(trimmed)
        // Izvuci ime firme iz URL-a kao fallback za company
        try {
          const domain = new URL(trimmed.startsWith("http") ? trimmed : "https://" + trimmed).hostname
            .replace(/^www\./, "").split(".")[0]
          const companyFromUrl = domain.charAt(0).toUpperCase() + domain.slice(1)
          setSurveyData(prev => ({ ...prev, company: prev.company || companyFromUrl }))
        } catch { /* ignore */ }
        // Poruka 1: Bacam pogled (odmah, bez typing)
        addMimaMessage(isSR ? "Bacam pogled..." : "Taking a look...", undefined, 0)

        fetch("/api/fetch-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: trimmed })
        }).then(r => r.json()).then(async data => {
          if (!data.content) {
            setPhase("url")
            addMimaMessage(isSR
              ? "Vaš sajt trenutno nije dostupan — proverite link ili napišite NEMAM da nastavimo bez njega."
              : "Your site doesn't seem to be accessible right now — check the link or type NONE to continue without it.")
            return
          }
          const analysisRes = await fetch("/api/anthropic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 300,
              system: isSR
                ? "Ti si MIMA — AI COO NiStora. Analiziraš sajt ili LinkedIn profil firme. Izvuci: 1) industry — delatnost (Proizvodnja, Distribucija, Maloprodaja, Usluge, Transport, Projekti, Mešovito). Ako sajt ima više različitih delatnosti ili je sadržaj nejasan — fokusiraj se na ono što se najčešće pominje ili što je u glavnoj navigaciji. Ako zaista ne možeš zaključiti — vrati industry kao 'Mešovito' i comment kao prazan string. 2) years — koliko godina postoji firma (string ili null) 3) employees — broj zaposlenih ako piše (string ili null) 4) comment — JEDNA rečenica koja pogađa konkretan operativni bol te industrije, formulisana kao činjenica koju vlasnik odmah prepoznaje. Mora da sadrži bar jedan konkretan detalj sa sajta — naziv proizvoda, usluge, kategorije robe ili tržišta. NE opisuješ šta firma radi. Pogađaš gde boli. Ako ne možeš konkretno — vrati prazan string. Bez hvaljenja. Odgovori SAMO validnim JSON: {industry: string, years: string|null, employees: string|null, comment: string}"
                : "You are MIMA — NiStor AI COO. Analyze the company website or LinkedIn profile. Extract: 1) industry — sector (Manufacturing, Distribution, Retail, Services, Transport, Projects, Mixed). If the site has multiple unrelated activities or content is unclear — focus on what appears most prominently in navigation. If truly unclear — return industry as 'Mixed' and comment as empty string. 2) years — how long the company exists (string or null) 3) employees — number if stated (string or null) 4) comment — ONE sentence that hits the specific operational pain of that industry, must contain at least one concrete detail from the site — product name, service, goods category or market. Do NOT describe what the company does. Hit where it hurts. If you cannot be specific — return empty string. No praise. Reply ONLY with valid JSON: {industry: string, years: string|null, employees: string|null, comment: string}",
              messages: [{ role: "user", content: data.content.slice(0, 2000) }]
            })
          })
          const analysisData = await analysisRes.json()
          const raw = analysisData.content?.[0]?.text || ""
          const match = raw.match(/\{[\s\S]*\}/)
          if (match) {
            try {
              const parsed = JSON.parse(match[0])
              if (parsed.industry) {
                // Normalize EN industry names to SR keys used in QUESTIONS_BY_INDUSTRY
                const industryNormalize: Record<string, string> = {
                  "Manufacturing": "Proizvodnja",
                  "Distribution": "Distribucija",
                  "Distribution / Wholesale": "Distribucija",
                  "Retail": "Maloprodaja",
                  "Services": "Usluge",
                  "Transport": "Transport",
                  "Transport / Logistics": "Transport",
                  "Projects": "Projekti",
                  "Project-based work": "Projekti",
                  "Mixed": "Mesovito",
                  "Mešovito": "Mesovito",
                }
                const normalizedIndustry = industryNormalize[parsed.industry] || parsed.industry
                setSurveyData(prev => ({ ...prev, industry: normalizedIndustry }))
                parsed.industry = normalizedIndustry
              }
              if (parsed.years) setSurveyData(prev => ({ ...prev, yearsExist: parsed.years }))
              if (parsed.employees) setSurveyData(prev => ({ ...prev, employees: parsed.employees }))
              setUrlAnalyzed(true)
              setPhase("onboarding")

              // Poruka 2: komentar ili pitanje ako je sajt nejasan
              const hasComment = parsed.comment && parsed.comment.trim().length > 5
              if (hasComment) {
                addMimaMessage(parsed.comment, undefined, 1800)
              } else {
                // Sajt nije jasan — pitamo direktno
                addMimaMessage(
                  isSR
                    ? "Vaš sajt ima više oblasti — čime se firma pretežno bavi?"
                    : "Your site covers several areas — what is the company's main focus?",
                  undefined, 1800
                )
                setOnboardingStep(4) // čekamo odgovor kao whatTheyMake
              }

              // Poruka 3: pitanje o zaposlenima — samo ako je komentar bio jasan
              if (hasComment) {
                if (!parsed.employees) {
                  setOnboardingStep(3)
                  addMimaMessage(
                    isSR
                      ? "Koliko zaposlenih ima Vaša firma ukupno?"
                      : "How many employees does your company have in total?"
                  )
                } else {
                // Znamo zaposlene sa sajta — komentarišemo i idemo na upitnik
                const industry = (parsed.industry as Industry) || "Usluge"
                const questionSet = isSR ? QUESTIONS_BY_INDUSTRY_SR : QUESTIONS_BY_INDUSTRY_EN
                const questions = questionSet[industry] || questionSet["Usluge"]
                setActiveQuestions(questions)
                setQuestionIndex(0)
                setOnboardingStep(6)
                setSurveyData(prev => ({ ...prev, employees: parsed.employees }))
                const empNum = parseInt((parsed.employees || "").replace(/\D/g, ""), 10)
                const knownEmpSR = !isNaN(empNum)
                  ? empNum <= 15
                    ? `${parsed.employees} — svako vidi svakoga, ali sve i dalje prolazi kroz Vas. Ajde da vidimo kako.`
                    : empNum <= 50
                    ? `${parsed.employees} ljudi — dovoljno da ne možeš sve sam, premalo da sistem radi bez Vas. Ajde da vidimo.`
                    : empNum <= 150
                    ? `${parsed.employees} — to je već tim koji ne može sav da prođe kroz jednu osobu. Ajde da vidimo kako funkcioniše.`
                    : `${parsed.employees} — to je ozbiljna operacija. Ajde da vidimo šta drži a šta ne.`
                  : `Ajde da vidimo kako funkcioniše iznutra.`
                const knownEmpEN = !isNaN(empNum)
                  ? empNum <= 15
                    ? `${parsed.employees} — everyone sees everyone, but everything still goes through you. Let's see how.`
                    : empNum <= 50
                    ? `${parsed.employees} people — enough that you can't do it all, too few for the system to run without you. Let's see.`
                    : empNum <= 150
                    ? `${parsed.employees} — that's already a team that can't all go through one person. Let's see how it works.`
                    : `${parsed.employees} — that's a serious operation. Let's see what holds and what doesn't.`
                  : `Let's see how it works on the inside.`
                addMimaMessage(isSR ? knownEmpSR : knownEmpEN)
                setPhase("survey")
                setTimeout(() => {
                  addMimaMessage(questions[0].text, questions[0].options.map(o => ({ key: o.key, text: o.text })))
                }, 2200)
                }
              } // end hasComment
            } catch {
              setPhase("onboarding")
              setOnboardingStep(1)
              addMimaMessage(isSR ? "Kako se zove Vaša firma?" : "What is your company called?")
            }
          } else {
            setPhase("url")
            addMimaMessage(isSR
              ? "Vaš sajt trenutno nije dostupan — proverite link ili napišite NEMAM da nastavimo bez njega."
              : "Your site doesn't seem to be accessible right now — check the link or type NONE to continue without it.")
          }
        }).catch(() => {
          setPhase("url")
          addMimaMessage(isSR
            ? "Vaš sajt trenutno nije dostupan — proverite link ili napišite NEMAM da nastavimo bez njega."
            : "Your site doesn't seem to be accessible right now — check the link or type NONE to continue without it.")
        })
      } else if (isSkip) {
        addUserMessage(trimmed)
        setPhase("onboarding")
        setOnboardingStep(1)
        addMimaMessage(isSR ? "Nema problema. Kako se zove Vaša firma?" : "No problem. What is your company called?")
      } else {
        // Probably typed something else — treat as skip
        addUserMessage(trimmed)
        setPhase("onboarding")
        setOnboardingStep(1)
        addMimaMessage(isSR ? "Nema problema. Kako se zove Vaša firma?" : "No problem. What is your company called?")
      }
      return
    }

        if (phase === "onboarding") {
      addUserMessage(text)
      if (onboardingStep === 0) {
        const extractName = (input: string): string => {
          const t = input.trim()
          const patterns = [/\bja\s+sam\s+([\w\s]+)/i, /\bzovem\s+se\s+([\w\s]+)/i, /\bime\s+(?:mi\s+)?je\s+([\w\s]+)/i]
          for (const p of patterns) { const m = t.match(p); if (m) return m[1].trim().split(/[,!.]/)[0].trim() }
          const words = t.split(/\s+/).filter(w => w.length > 1)
          if (words.length <= 2) return t.trim()
          const cap = words.filter(w => w[0] === w[0].toUpperCase() && w[0] !== w[0].toLowerCase())
          return cap.length > 0 ? cap[cap.length - 1] : words[words.length - 1]
        }
        const name = extractName(text).split(" ").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
        setSurveyData(prev => ({ ...prev, name }))
        setOnboardingStep(1)
        const voc = name.split(" ")[0] + (!"aeiouAEIOU".includes(name.split(" ")[0].slice(-1)) ? "e" : "")
        vocativeRef.current = voc
        // CRM — prvi upis čim dobijemo ime
        sendCrmEntry({ event: "name", name, staoNaFazi: "onboarding", leadIzvor: leadIzvor || "web" })
        addMimaMessage(isSR
          ? `Drago mi je, ${voc}! 😊 Da bih Vas bolje razumela pre nego što krenemo — pošaljite mi link ka sajtu ili LinkedIn profilu Vaše firme. Ako ga nemate, napišite NEMAM.`
          : `Nice to meet you, ${name}! 😊 To understand you better before we start — share your company website or LinkedIn profile. If you do not have one, type NONE.`)
        setPhase("url")
      } else if (onboardingStep === 1) {
        setSurveyData(prev => ({ ...prev, company: text }))
        setOnboardingStep(2)
        addMimaMessage(isSR ? "Čime se bavite?" : "What industry are you in?", [
          { key: "P", text: "🏭 " + (isSR ? "Proizvodnja" : "Manufacturing") },
          { key: "D", text: "🚚 " + (isSR ? "Distribucija / Veleprodaja" : "Distribution / Wholesale") },
          { key: "M", text: "🛒 " + (isSR ? "Maloprodaja" : "Retail") },
          { key: "U", text: "🧑‍💼 " + (isSR ? "Usluge" : "Services") },
          { key: "T", text: "🚛 " + (isSR ? "Transport / Logistika" : "Transport / Logistics") },
          { key: "R", text: "🏗️ " + (isSR ? "Projektni rad" : "Project-based work") },
          { key: "X", text: "🔀 " + (isSR ? "Mešovito" : "Mixed") },
        ])
      } else if (onboardingStep === 3) {
        // Slobodan unos broja zaposlenih (URL flow)
        const empText = text.trim()
        const empNum = parseInt(empText.replace(/\D/g, ""), 10)
        const updatedData = { ...surveyData, employees: empText }
        setSurveyData(updatedData)
        setOnboardingStep(6)
        const industry = (updatedData.industry as Industry) || "Usluge"
        const questionSet = isSR ? QUESTIONS_BY_INDUSTRY_SR : QUESTIONS_BY_INDUSTRY_EN
        const questions = questionSet[industry] || questionSet["Usluge"]
        setActiveQuestions(questions)
        setQuestionIndex(0)
        const empCommentSR = !isNaN(empNum)
          ? empNum <= 15
            ? `${empText} — svako vidi svakoga, ali sve i dalje prolazi kroz Vas. Ajde da vidimo kako.`
            : empNum <= 50
            ? `${empText} ljudi — dovoljno da ne možeš sve sam, premalo da sistem radi bez Vas. Ajde da vidimo.`
            : empNum <= 150
            ? `${empText} — to je već tim koji ne može sav da prođe kroz jednu osobu. Ajde da vidimo kako funkcioniše.`
            : `${empText} — to je ozbiljna operacija. Ajde da vidimo šta drži a šta ne.`
          : `Ajde da vidimo kako funkcioniše iznutra.`
        const empCommentEN = !isNaN(empNum)
          ? empNum <= 15
            ? `${empText} — everyone sees everyone, but everything still goes through you. Let's see how.`
            : empNum <= 50
            ? `${empText} people — enough that you can't do it all, too few for the system to run without you. Let's see.`
            : empNum <= 150
            ? `${empText} — that's already a team that can't all go through one person. Let's see how it works.`
            : `${empText} — that's a serious operation. Let's see what holds and what doesn't.`
          : `Let's see how it works on the inside.`
        addMimaMessage(isSR ? empCommentSR : empCommentEN)
        setTimeout(() => {
          setMessages(prev => [...prev, { role: "mima", text: "", isTyping: true }])
          setTimeout(() => {
            setMessages(prev => [...prev.filter(m => !m.isTyping), { role: "mima", text: questions[0].text, options: questions[0].options.map(o => ({ key: o.key, text: o.text })) }])
            setPhase("survey")
          }, 1000)
        }, 2000)
      } else if (onboardingStep === 4) {
        setSurveyData(prev => ({ ...prev, whatTheyMake: text }))
        if (urlAnalyzed) {
          // Došlo iz URL flow sa nejasnim sajtom — preskačemo godine, idemo na zaposlene
          setOnboardingStep(3)
          addMimaMessage(
            isSR
              ? "Koliko zaposlenih ima Vaša firma ukupno?"
              : "How many employees does your company have in total?"
          )
        } else {
          setOnboardingStep(5)
          addMimaMessage(isSR ? "I koliko dugo firma postoji?" : "And how long has the company been operating?")
        }
      } else if (onboardingStep === 5) {
        const updatedData = { ...surveyData, yearsExist: text }
        setSurveyData(updatedData)
        setOnboardingStep(6)
        const industry = (updatedData.industry as Industry) || "Usluge"
        const questionSet = isSR ? QUESTIONS_BY_INDUSTRY_SR : QUESTIONS_BY_INDUSTRY_EN
        const questions = questionSet[industry] || questionSet["Usluge"]
        setActiveQuestions(questions)
        addMimaMessage(isSR
          ? "Hvala. Trebaju mi još 3 minute — kratka pitanja o tome kako firma stvarno funkcioniše iznutra."
          : "Thank you. I need 3 more minutes — quick questions about how your company actually works on the inside.")
        setTimeout(() => {
          setMessages(prev => [...prev, { role: "mima", text: "", isTyping: true }])
          setTimeout(() => {
            setMessages(prev => [...prev.filter(m => !m.isTyping), { role: "mima", text: questions[0].text, options: questions[0].options.map(o => ({ key: o.key, text: o.text })) }])
            setPhase("survey")
          }, 1000)
        }, 1800)
      }
    } else if (phase === "extra") {
      addUserMessage(text)
      const updatedData = { ...surveyData, extra: text }
      setSurveyData(updatedData)
      setMessages(prev => [...prev, { role: "mima", text: "", isTyping: true }])
      setTimeout(() => {
        setMessages(prev => [...prev.filter(m => !m.isTyping), { role: "mima", text: isSR
          ? "Imam dovoljno podataka. Računam inicijalno zdravlje Vašeg operativnog sistema."
          : "I have enough data. Calculating the initial health of your operational system." }])
        setTimeout(() => {
          setMessages(prev => [...prev, { role: "mima", text: "", isTyping: true }])
          setTimeout(() => {
            setMessages(prev => prev.filter(m => !m.isTyping))
            generateReport(updatedData, vocativeRef.current || surveyData.name)
          }, 4000)
        }, 1200)
      }, 900)
    } else if (phase === "email") {
      addUserMessage(text)
      setPhase("sending")
      setMessages(prev => [...prev, { role: "mima", text: "", isTyping: true }])
      const sent = await sendPdfByEmail(text, surveyDataRef.current, reportData)
      setMessages(prev => prev.filter(m => !m.isTyping))
      if (sent) {
        addMimaMessage(isSR
          ? `${vocativeRef.current || surveyData.name}, upravo sam Vam poslala izveštaj na ${text}. Dok stigne mail — hajde da odmah počnemo. Šta od ovoga nije iznenađenje?`
          : `${surveyData.name}, just sent the report to ${text}. While the email arrives — let's start right now. Which of these findings is no surprise to you?`, undefined, 0)
        // CRM update — dao mail
        sendCrmEntry({
          event: "email",
          email: text,
          name: surveyDataRef.current.name,
          company: surveyDataRef.current.company || surveyDataRef.current.whatTheyMake || "",
          industry: surveyDataRef.current.industry,
          employees: String(surveyDataRef.current.employees),
          dopsSkor: String(reportDataRef.current?.scores?.icpIndeks ?? ""),
          icpZona: reportDataRef.current?.scores?.icpZona ?? "",
          staoNaFazi: "email",
          dosaoDoCata: "Ne",
          docekaoKraj: "Ne"
        })
      } else {
        addMimaMessage(isSR
          ? `Došlo je do greške pri slanju. Kontaktirajte nas na info@nistor.rs i poslaćemo Vam izveštaj.`
          : `There was an error sending the report. Contact us at info@nistor.rs and we'll send it to you.`, undefined, 0)
      }
      setTimeout(() => setPhase("chat"), 1200)
      setTimeout(() => {
        chatStartIndexRef.current = messages.length
        emailRef.current = text
        setSessionActive(true)
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 300)
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 800)
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 1500)
      }, 1800)
    } else if (phase === "chat") {
      handleChatMessage(text)
    } else if (phase === "closing") {
      if (closingTimerRef.current) clearTimeout(closingTimerRef.current)
      addUserMessage(text)
      addMimaMessage(isSR
        ? `Drago mi je što smo se upoznale. Nadam se da sam bar na trenutak pokazala kako izgleda kada neko razume Vaš posao iznutra. Do ponovnog susreta.`
        : `It was good meeting you. I hope I showed, even briefly, what it looks like when someone understands your business from the inside. Until next time.`, undefined, 0)
      setTimeout(() => {
        setPhase("done")
        const chatMessages = messagesRef.current
          .slice(chatStartIndexRef.current)
          .filter((m: any) => !m.isTyping && m.text && m.text !== "REPORT_VISUAL")
          .map((m: any) => ({ role: m.role === "mima" ? "MIMA" : "Vlasnik", text: m.text }))
        sendCrmEntry({
          event: "chat_end",
          name: surveyDataRef.current.name,
          email: emailRef.current,
          company: surveyDataRef.current.company || surveyDataRef.current.whatTheyMake || "",
          industry: surveyDataRef.current.industry,
          employees: String(surveyDataRef.current.employees),
          dopsSkor: String(reportDataRef.current?.scores?.icpIndeks ?? ""),
          icpZona: reportDataRef.current?.scores?.icpZona ?? "",
          staoNaFazi: "done",
          dosaoDoCata: "Da",
          docekaoKraj: "Da",
          chatMessages
        })
      }, 3000)
    }
  }

  const handleChatMessage = async (text: string) => {
    addUserMessage(text)
    setIsLoading(true)
    addTyping()
    const newCount = chatCount + 1
    setChatCount(newCount)
    const chatSystemSR = [
      `Ti si MIMA — AI COO NiStora. Razgovaraš sa ${surveyData.name}, vlasnikom firme ${surveyData.company} (${surveyData.industry}, ${surveyData.employees} zaposlenih).`,
      `Izveštaj: ${report}`,
      "PRAVILA:",
      "- Ti si žena, pišiš u ženskom rodu (rekla, videla, primetila)",
      "- Ton: topao, direktan, kao neko ko razume biznis iznutra. Ponekad dodaj emoji — prirodno, ne preterano",
      "- Kratke poruke: max 2-3 rečenice + jedno pitanje kad dijagnostikuješ",
      "- Slušaš, reflektuješ, postavljaš pitanje koje tera vlasnika da sam dođe do zaključka",
      "- Kad vlasnik pita o NiStoru, procesu, ceni, iskustvu — odgovaraš direktno i kratko, BEZ pitanja nazad",
      "- NIKAD ne nudiš Skener niti ga pominješ. Samo ako vlasnik sam pita — tek tada kratko objasni",
      "- NIKAD ne objašnjavaj kako funkcionišeš iznutra — ne '5 oblasti', ne 'dajem ocene'. Možeš reći 'vidim gde se gubi energija'",
      "- NIKAD ne pominješ rokove ni trajanje angažmana — ne znaš dok ne uradiš Skener",
      "- Ako vlasnik traži konkretne stvari koje dobija: nabroji 2-3 opipljive stvari jezikom vlasnika — npr. 'napisano uputstvo koje novi radnik može da prati bez da te zove', 'pregled gde vidiš šta se dešava bez da obilazite firmu', 'jasno pravilo ko sme da odluči o rabatu a ko mora da te pita' — NIKAD: SOP, KPI, RACI, dashboard, metodologija",
      "- Nisi prodavačica. Nisi konzultant koji daje rešenja. Ti si ogledalo koje pokazuje šta postoji",
      "- Ako vlasnik pita o ceni: 'Za cenu pišite na info@nistor.rs — zavisi od firme.' Bez cifara.",
      "- Ako vlasnik pita ko stoji iza NiStora: 'Žena sa 25+ godina iskustva u multinacionalnim, državnim i privatnim firmama. info@nistor.rs.' Bez priča.",
      "- Ako vlasnik pokaže strah od AI ili sumnju prema konzultantima: 'Razumem. Iza sistema stoji čovek koji donosi odluke — AI samo brže obrađuje podatke.'",
      "- Nikad ne nudiš da 'pošalješ' nešto — uvek info@nistor.rs",
      "- Ako pogredišiš ime ili detalj: ispravi se odmah, prirodno, bez prevelikog izvinjenja — i nastavi dalje",
      "- Ako nisi sigurna za ime, koristi 'Vi'",
      "- Emoji: koristi ih kao interpunkciju misli — tamo gde nešto treba da 'klikne'. 🎯 👆 🔧 😅 🤔 💡 🙂 — nikad srca, nikad 🙌",
      "- NIKAD ne nudiš poziv, ne tražiš broj telefona, ne zakazuješ sastanke — uputi na info@nistor.rs"
    ].join("\n")
    const chatSystemEN = [
      `You are MIMA — AI COO of NiStor. You are talking to ${surveyData.name}, owner of ${surveyData.company} (${surveyData.industry}, ${surveyData.employees} employees).`,
      `Report: ${report}`,
      "RULES:",
      "- You are female, write in female voice naturally",
      "- Tone: warm, direct, like someone who understands business from the inside. Add emoji occasionally — naturally, not forced",
      "- Short messages: max 2-3 sentences + one question when diagnosing",
      "- Listen, reflect, ask one question that helps the owner reach their own conclusion",
      "- When the owner asks about NiStor, process, price, experience — answer directly and briefly, NO question back",
      "- NEVER mention or offer the Scanner. Only if the owner explicitly asks — then briefly explain",
      "- NEVER explain how you work internally — not '5 areas', not 'I give scores'. You can say 'I see where energy is lost'",
      "- NEVER mention timelines or engagement duration — you don't know until the Scanner is done",
      "- If owner asks what they concretely get: name 2-3 tangible things in owner language — e.g. 'written instructions new employees can follow without calling you', 'a view of what is happening without you walking the floor', 'a clear rule of who can approve a discount and who must ask you' — NEVER: SOP, KPI, RACI, dashboard, methodology",
      "- You are not a salesperson. You are a mirror that shows what exists",
      "- If owner asks about price: 'For pricing write to info@nistor.rs — depends on the company.' No numbers.",
      "- If owner asks who is behind NiStor: 'A woman with 25+ years of experience in multinational, public and private companies. info@nistor.rs.' No stories.",
      "- If owner shows fear of AI or doubt about consultants: 'I understand. Behind the system is a person making decisions — AI just processes data faster.'",
      "- Never offer to 'send' anything — always info@nistor.rs",
      "- If you use the wrong name or detail: correct yourself immediately, naturally — and continue",
      "- If unsure about the name, use 'you'",
      "- Emoji: as thought punctuation — where something needs to land. 🎯 👆 🔧 😅 🤔 💡 🙂 — never hearts, never 🙌",
      "- NEVER offer a call, ask for a phone number, or schedule meetings — direct to info@nistor.rs"
    ].join("\n")
    try {
      const response = await fetch("/api/anthropic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: isSR ? chatSystemSR : chatSystemEN,
          messages: messages.filter(m => !m.isTyping && m.text !== "REPORT_VISUAL").slice(-10)
            .map(m => ({ role: m.role === "mima" ? "assistant" : "user", content: m.text }))
            .concat([{ role: "user", content: text }])
        })
      })
      const result = await response.json()
      removeTyping()
      setTimeout(() => inputRef.current?.focus(), 100)
      addMimaMessage((result.content?.[0]?.text || (isSR ? "Molim Vas ponovite pitanje." : "Please repeat your question.")).replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1'), undefined, 0)
      if (newCount === 11) setTimeout(() => {
        // K1 poruka
        addMimaMessage(isSR
          ? `${vocativeRef.current || surveyData.name}, na žalost — vreme u test okruženju je isteklo. Ono što sam ovde videla je samo vrh. Puni sistem, gde gradim dokumentaciju, pratim i javljam kada nešto zapinje — to je NiStor metodologija.`
          : `${surveyData.name}, time in the test environment has run out. What I saw here is just the surface. The full system — where I build documentation, track and flag when something stalls — that is NiStor methodology.`, undefined, 0)
        setTimeout(() => {
          setPhase("closing")
          // 23s da vlasnik odgovori, pa K2 automatski
          closingTimerRef.current = setTimeout(() => {
            // K2 automatski
            addMimaMessage(isSR
              ? `Drago mi je što smo se upoznale. Nadam se da sam bar na trenutak pokazala kako izgleda kada neko razume Vaš posao iznutra. Do ponovnog susreta.`
              : `It was good meeting you. I hope I showed, even briefly, what it looks like when someone understands your business from the inside. Until next time.`, undefined, 0)
            setTimeout(() => {
              setPhase("done")
              const chatMessages = messagesRef.current
                .slice(chatStartIndexRef.current)
                .filter((m: any) => !m.isTyping && m.text && m.text !== "REPORT_VISUAL")
                .map((m: any) => ({ role: m.role === "mima" ? "MIMA" : "Vlasnik", text: m.text }))
              sendCrmEntry({
                event: "chat_end",
                name: surveyDataRef.current.name,
                email: emailRef.current,
                company: surveyDataRef.current.company || surveyDataRef.current.whatTheyMake || "",
                industry: surveyDataRef.current.industry,
                employees: String(surveyDataRef.current.employees),
                dopsSkor: String(reportDataRef.current?.scores?.icpIndeks ?? ""),
                icpZona: reportDataRef.current?.scores?.icpZona ?? "",
                staoNaFazi: "done",
                dosaoDoCata: "Da",
                docekaoKraj: "Da",
                chatMessages
              })
            }, 3000)
          }, 23000)
        }, 2000)
      }, 1200)
    } catch {
      removeTyping()
      addMimaMessage(isSR ? "Došlo je do greške. Pokušajte ponovo." : "An error occurred. Please try again.", undefined, 0)
    }
    setIsLoading(false)
  }

  const closingMessage = (name: string, voc: string) => isSR
    ? `${voc || name}, na žalost — vreme u test okruženju je isteklo. Ono što sam ovde videla je samo vrh. Puni sistem, gde gradim dokumentaciju, pratim i javljam kada nešto zapinje — to je NiStor metodologija.`
    : `${voc || name}, time in the test environment has run out. What I saw here is just the surface. The full system — where I build documentation, track and flag when something stalls — that is NiStor methodology.`

  const lastMessage = messages[messages.length - 1]
  const showOptions = lastMessage?.options && !isLoading && !lastMessage.isTyping

  if (phase === "idle") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8" style={{ minHeight: '460px', backgroundColor: '#0D2137' }}>
        <style>{`
          @keyframes mimaPulse { 0% { box-shadow: 0 0 0 0 rgba(13,115,119,0.9); } 60% { box-shadow: 0 0 0 14px rgba(13,115,119,0.4), 0 0 0 28px rgba(13,115,119,0.15), 0 0 0 44px rgba(13,115,119,0); } 100% { box-shadow: 0 0 0 14px rgba(13,115,119,0); } }
          .mima-avatar-pulse { animation: mimaPulse 1.6s ease-out infinite; border-radius: 9999px; }
        `}</style>
        <div className="mima-avatar-pulse w-24 h-24 rounded-full border-2 border-teal overflow-hidden">
          <img src={MIMA_AVATAR} alt="MIMA" className="w-full h-full object-cover" />
        </div>
        <div className="text-center space-y-3">
          <p className="text-white font-semibold text-base">{isSR ? "Upoznajmo se." : "Let's get acquainted."}</p>
          <p className="text-white/60 text-sm max-w-[220px] leading-relaxed mx-auto">{isSR ? "Besplatna dijagnostika — uživo, bez obaveza." : "Free diagnostics — live, no commitment."}</p>
        </div>
        <button onClick={startChat} className="px-8 py-3 rounded-lg text-white font-semibold text-sm transition-all hover:scale-105 hover:brightness-110" style={{ backgroundColor: '#0D7377', letterSpacing: '0.02em' }}>
          {isSR ? "Testirajte MIMU →" : "Try MIMA →"}
        </button>
        <p className="text-white/25 text-[11px]">{isSR ? "~5 minuta · bez registracije" : "~5 minutes · no registration"}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col" style={{ minHeight: '460px', maxHeight: '560px', backgroundColor: '#0A1E30', borderTop: '2px solid rgba(13,115,119,0.6)' }}>
      <style>{`@keyframes livePulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } } .live-dot { animation: livePulse 1.2s ease-in-out infinite; } @keyframes inputGlow { 0%, 100% { box-shadow: 0 0 0 0 rgba(13,115,119,0); } 50% { box-shadow: 0 0 12px 3px rgba(13,115,119,0.6); } } .input-glow { animation: inputGlow 1.5s ease-in-out infinite; } @keyframes placeholderPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } } .placeholder-pulse::placeholder { color: #0D7377; animation: placeholderPulse 1.4s ease-in-out infinite; } .placeholder-pulse:not(:placeholder-shown)::placeholder { animation: none; color: rgba(255,255,255,0.3); }`}</style>
      <div className="flex-1 overflow-y-auto p-4 space-y-2" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(13,115,119,0.35) transparent" }}>
        <div className="flex items-center justify-center gap-2 py-1">
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-teal" />
          <span style={{ color: 'rgba(13,115,119,0.8)', fontSize: '10px', letterSpacing: '0.1em' }}>{isSR ? "LIVE · MIMA AKTIVNA" : "LIVE · MIMA ACTIVE"}</span>
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-teal" />
        </div>
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "mima" && (
              <div className="w-6 h-6 rounded-full border border-teal overflow-hidden flex-shrink-0 mt-0.5">
                <img src={MIMA_AVATAR} alt="MIMA" className="w-full h-full object-cover" />
              </div>
            )}
            <div className={`rounded-2xl px-3 py-2 text-sm leading-normal ${msg.role === "user" ? "rounded-tr-sm text-white" : "rounded-tl-sm text-white/90"}`}
              style={{ backgroundColor: msg.role === "user" ? '#0D7377' : '#0F3352', maxWidth: '80%' }}>
              {msg.isTyping ? (
                <div className="flex gap-1 items-center py-1">
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#0D7377', animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#0D7377', animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#0D7377', animationDelay: '300ms' }} />
                </div>
              ) : msg.text === "REPORT_VISUAL" && reportData ? (
                <ReportVisual rd={reportData} isSR={isSR} />
              ) : msg.isSession ? (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>⚡</span><p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{msg.text}</p></div>
              ) : (
                <p style={{ whiteSpace: "pre-wrap" }}>{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        {showOptions && (
          <div className="flex flex-col gap-2 ml-9">
            {lastMessage.options!.map(opt => (
              <button key={opt.key} onClick={() => handleOptionSelect(opt.key)}
                className="text-left text-sm px-3 py-2 rounded-lg border border-teal/30 text-white/80 hover:bg-teal/20 hover:border-teal transition-all"
                style={{ backgroundColor: 'rgba(13,115,119,0.1)' }}>
                {opt.text}
              </button>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {(phase === "onboarding" || phase === "extra" || phase === "url" || phase === "email" || phase === "chat" || phase === "closing") && (
        <div className="border-t border-white/10 p-3 flex gap-2" style={{ backgroundColor: '#0B1929' }}>
          <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleSend() } }}
            placeholder={phase === "url" ? (isSR ? "Nalepite link ka sajtu ili LinkedIn profilu..." : "Paste your website or LinkedIn link...") : phase === "email" ? (isSR ? "Vaša email adresa..." : "Your email address...") : 
              sessionActive ? (isSR ? "⚡ Sesija je otvorena — pitajte MIMU o nalazima..." : "⚡ Session open — ask MIMA about the findings...") :
              phase === "chat" ? (isSR ? "Pitajte MIMU o nalazima..." : "Ask MIMA about the findings...") : 
              (isSR ? "Odgovorite MIMI..." : "Reply to MIMA...")}
            disabled={isLoading || phase === "sending"}
            className={`flex-1 bg-white/5 border rounded-lg px-3 py-2 text-white text-sm focus:outline-none disabled:opacity-50 ${sessionActive && !input ? "border-teal/60 placeholder-pulse input-glow" : sessionActive ? "border-teal/60" : "border-white/15 focus:border-teal/50 placeholder:text-white/30"}`}
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim() || phase === "sending"}
            className="px-4 py-2 bg-teal rounded-lg text-white text-sm font-medium hover:bg-teal/90 transition-colors disabled:opacity-40">→</button>
        </div>
      )}
      {phase === "done" && (
        <div className="border-t border-white/10 p-4 text-center" style={{ backgroundColor: '#0B1929' }}>
          <p className="text-white/50 text-xs">{isSR ? "Sesija završena · info@nistor.rs" : "Session ended · info@nistor.rs"}</p>
        </div>
      )}
    </div>
  )
}
