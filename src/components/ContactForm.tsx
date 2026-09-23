"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact, whatsappLink } from "@/data/site";
import { interpolate } from "@/i18n/format";
import { useI18n } from "@/i18n/client";

const EMPTY = { name: "", email: "", phone: "", message: "" };

export default function ContactForm() {
  const { t } = useI18n();
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast.error(t.contact.formValidation);
      return;
    }

    setSent(true);
    toast.success(t.contact.formSuccessToast);
  }

  if (sent) {
    const message = interpolate(t.contact.whatsappMessage, {
      name: form.name,
      phone: form.phone,
      message: form.message,
    });

    return (
      <Card className="rounded-xl border shadow-soft">
        <CardContent className="p-8 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="size-7" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-display text-xl font-bold">
            {interpolate(t.contact.formSuccessTitle, {
              name: form.name.split(" ")[0],
            })}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t.contact.formSuccessBody}
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.contact.formSuccessWhatsapp}
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setForm(EMPTY);
                setSent(false);
              }}
            >
              {t.contact.formAgain}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border shadow-soft">
      <CardContent className="p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold">{t.contact.formTitle}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t.contact.formBody}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="k-name"
                className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
              >
                {t.contact.formName}
              </Label>
              <Input
                id="k-name"
                required
                autoComplete="name"
                value={form.name}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, name: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="k-phone"
                className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
              >
                {t.contact.formPhone}
              </Label>
              <Input
                id="k-phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+355 69 ..."
                value={form.phone}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, phone: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label
                htmlFor="k-email"
                className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
              >
                {t.contact.formEmail}
              </Label>
              <Input
                id="k-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, email: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label
                htmlFor="k-message"
                className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
              >
                {t.contact.formMessage}
              </Label>
              <Textarea
                id="k-message"
                rows={5}
                required
                placeholder={t.contact.formMessagePlaceholder}
                value={form.message}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, message: event.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-relaxed text-muted-foreground">
              {interpolate(t.contact.formFooter, { email: contact.email })}
            </p>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              <Send className="size-4" aria-hidden="true" />
              {t.contact.formSubmit}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
