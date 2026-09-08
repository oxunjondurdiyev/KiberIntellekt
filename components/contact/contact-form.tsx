"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import {
  CheckCircle2,
  LoaderCircle,
  Send,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");

  const schema = z.object({
    name: z.string().min(1, t("validation.nameRequired")),
    email: z.email(t("validation.emailInvalid")),
    subject: z.string().optional(),
    message: z.string().min(10, t("validation.messageMin")),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (!WEB3FORMS_ACCESS_KEY) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-secondary/40 p-6 text-sm text-muted-foreground">
        {t("notConfiguredMessage")}
      </div>
    );
  }

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: values.name,
          email: values.email,
          subject: values.subject || `KiberIntellekt — ${values.name}`,
          message: values.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          {t("nameLabel")}
        </label>
        <input
          id="name"
          {...register("name")}
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
        />
        {errors.name && (
          <p className="mt-1.5 text-xs text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          {t("emailLabel")}
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="subject"
          className="text-sm font-medium text-foreground"
        >
          {t("subjectLabel")}
        </label>
        <input
          id="subject"
          {...register("subject")}
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-sm font-medium text-foreground"
        >
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle size={16} className="animate-spin" />
            {t("sending")}
          </>
        ) : (
          <>
            {t("sendButton")}
            <Send size={16} />
          </>
        )}
      </Button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 size={16} />
          {t("successMessage")}
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-destructive">
          <TriangleAlert size={16} />
          {t("errorMessage")}
        </p>
      )}
    </form>
  );
}
