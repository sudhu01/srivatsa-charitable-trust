'use client';
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Navbar from "./navbar";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// 1. Added Users (for Trustees) and Heart (for Donations) to imports
import { Mail, Phone, Users, Loader2, Heart, Info } from "lucide-react";

import emailjs from '@emailjs/browser';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).optional().or(z.literal('')),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must not exceed 500 characters." }),
});

export function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({ message: "", success: false });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);
    setSubmissionStatus({ message: "", success: false });
    
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const templateParams = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        subject: values.subject,
        message: values.message,
    };

    try {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        setSubmissionStatus({ message: "Thank you! Your message has been sent successfully.", success: true });
        form.reset();
    } catch (error) {
        console.error("Failed to send email:", error);
        setSubmissionStatus({ message: "An error occurred. Please try again later.", success: false });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');
        .font-merriweather {
          font-family: 'Merriweather', serif;
        }
      `}</style>

      <div className="min-h-screen bg-white text-purple-950 diagonal-bg"> 
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col border-x border-dashed border-gray-300 bg-white">
        <Navbar />

        {/* Main content */}
        <main className="flex-grow">
          <section className="">
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
              
              {/* Section 1: Queries & Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                
                {/* Left Column: Contact Info */}
                <div className="space-y-8">
                  <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 font-merriweather">For queries & suggestions</h1>
                  <p className="mt-3 text-lg text-slate-600">We'd love to hear from you. Fill out the form or use the contact information below to reach us.</p>
                  <div className="space-y-6 pt-4">
                      {/* 1. Updated Icon to Users */}
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="bg-purple-600 text-white h-12 w-12 flex items-center justify-center rounded-lg">
                            <Users className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">The Trustees</h3>
                          <p className="text-slate-600">Mr. Balajee Raghavachari<br></br>Mr. Anbuselvam</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4"><div className="flex-shrink-0"><div className="bg-purple-600 text-white h-12 w-12 flex items-center justify-center rounded-lg"><Mail className="h-6 w-6" /></div></div><div><h3 className="text-xl font-semibold">Email Us</h3><p className="text-slate-600">rbalajee27@rb-co.in<br></br>anbuselvamn@gmail.com</p></div></div>
                      <div className="flex items-start space-x-4"><div className="flex-shrink-0"><div className="bg-purple-600 text-white h-12 w-12 flex items-center justify-center rounded-lg"><Phone className="h-6 w-6" /></div></div><div><h3 className="text-xl font-semibold">Call Us</h3><p className="text-slate-600">+91 9500080107<br></br>+91 9003250931</p></div></div>
                  </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="bg-slate-50 p-8 rounded-xl border border-dashed border-gray-300">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Sender Name</FormLabel><FormControl><Input placeholder="Your full name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone Number (Optional)</FormLabel><FormControl><Input placeholder="+91 12345 67890" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="Please type your message here." className="resize-none" rows={5} {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white" disabled={isSubmitting}>
                        {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</>) : ("Send Message")}
                      </Button>
                      {submissionStatus.message && (
                        <p className={`text-center text-sm mt-4 ${submissionStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                          {submissionStatus.message}
                        </p>
                      )}
                    </form>
                  </Form>
                </div>
              </div>

              {/* 2. New 'For Donations' Section */}
              <div className="mt-20 border-t border-dashed border-gray-300 pt-16">
                 <div className="flex flex-col md:flex-row gap-8 items-start">
                    
                    {/* Header */}
                    <div className="md:w-1/3">
                      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 font-merriweather">For donations</h1>
                      <p className="mt-3 text-lg text-slate-600">Your contributions help us build a just and inclusive society.</p>
                      <div className="mt-6">
                        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-600">
                          <Heart className="h-8 w-8" />
                        </div>
                      </div>
                    </div>

                    {/* 3. Bank Details Card */}
                    <div className="md:w-2/3 w-full bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5">
                         <Heart className="h-32 w-32" />
                      </div>
                      
                      <div className="space-y-4 relative z-10">
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Transfer to</h3>
                          <p className="text-xl sm:text-2xl font-bold text-purple-950 mt-1">Srivatsa Charitable Trust</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-4">
                          <div>
                            <p className="text-sm text-slate-500 font-medium">Bank Name</p>
                            <p className="text-slate-800 font-semibold">State Bank of India</p>
                          </div>
                          <div>
                             <p className="text-sm text-slate-500 font-medium">Account Type</p>
                             <p className="text-slate-800 font-semibold">Current Account</p>
                          </div>
                          <div>
                             <p className="text-sm text-slate-500 font-medium">Account Number</p>
                             <p className="text-slate-800 font-mono font-bold text-lg">44543425010</p>
                          </div>
                          <div>
                             <p className="text-sm text-slate-500 font-medium">IFSC Code</p>
                             <p className="text-slate-800 font-mono font-bold text-lg">SBIN0001020</p>
                          </div>
                          <div className="sm:col-span-2">
                             <p className="text-sm text-slate-500 font-medium">Branch Address</p>
                             <p className="text-slate-800">Thyagarajanagar Branch, TNagar, Chennai 600017</p>
                          </div>
                        </div>

                        {/* 4. Footer Note */}
                        <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-100 flex gap-3 items-start">
                           <Info className="h-5 w-5 text-purple-700 flex-shrink-0 mt-0.5" />
                           <p className="text-sm text-purple-900">
                             <span className="font-bold">Note for Tax Exemption:</span> Use the <span className="font-semibold">Queries and Suggestions</span> section above to provide details of the donor and donation for the S. 80G Certificate.
                           </p>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>

            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-50 text-slate-600 border-t border-gray-200">
            <div className="px-6 py-12 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                {/* Column 1: Identity */}
                <div className="flex flex-col space-y-4">
                  <h3 className="font-bold text-purple-950 text-lg font-merriweather">Srivatsa Charitable Trust</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Dedicated to building a sustainable and inclusive future through education and community welfare.
                  </p>
                  <div className="pt-2 text-xs text-slate-400">
                    © {new Date().getFullYear()} All rights reserved.
                  </div>
                </div>

                {/* Column 2: Tax Exemptions */}
                <div className="flex flex-col space-y-2">
                  <h4 className="font-semibold text-slate-800 mb-2 uppercase tracking-wide text-xs">Tax Exemptions</h4>
                  <div className="p-3 bg-white border border-gray-200 rounded-md shadow-sm">
                    <p className="font-mono text-xs text-slate-500">Income Tax Act S. 12A</p>
                    <p className="font-medium text-slate-700">ABMTS6650DE20251</p>
                    <p className="text-[10px] text-green-600 mt-1">Valid till AY2028-29</p>
                  </div>
                  <div className="p-3 bg-white border border-gray-200 rounded-md shadow-sm">
                    <p className="font-mono text-xs text-slate-500">Income Tax Act S. 80G</p>
                    <p className="font-medium text-slate-700">ABMTS6650DF20251</p>
                    <p className="text-[10px] text-green-600 mt-1">Valid till AY2028-29</p>
                  </div>
                </div>

                {/* Column 3: Registrations */}
                <div className="flex flex-col space-y-2">
                  <h4 className="font-semibold text-slate-800 mb-2 uppercase tracking-wide text-xs">Official Registrations</h4>
                  <ul className="space-y-3">
                    <li className="flex flex-col">
                      <span className="text-xs text-slate-500">Legal Entity Identifier (LEI)</span>
                      <span className="font-mono text-slate-700 bg-white border border-gray-200 px-2 py-1 rounded w-fit mt-1">984500594F1GQ1FDM687</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-xs text-slate-500">Darpan Registration ID</span>
                      <span className="font-mono text-slate-700 bg-white border border-gray-200 px-2 py-1 rounded w-fit mt-1">TN/2025/0916713</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </footer>
      </div>
    </div>
    </div>
  );
}