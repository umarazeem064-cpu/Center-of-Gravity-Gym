import { CheckCircle2, MessageCircle, ShieldCheck, X } from 'lucide-react';
import { GYM_PROFILE } from '../data/gymData';

export interface TrialRequestSummary {
  fullName: string;
  phone: string;
  goal: string;
  planName: string;
  preferredTime: string;
}

interface TrialModalProps {
  request: TrialRequestSummary | null;
  onClose: () => void;
}

export function TrialModal({ request, onClose }: TrialModalProps) {
  if (!request) return null;

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Center of Gravity Gym!\n\n` +
      `I would like to book my Free Trial Pass:\n` +
      `• Name: ${request.fullName}\n` +
      `• Phone/WhatsApp: ${request.phone}\n` +
      `• Fitness Goal: ${request.goal}\n` +
      `• Selected Plan: ${request.planName}\n` +
      `• Preferred Visit Time: ${request.preferredTime}\n\n` +
      `Location: ${GYM_PROFILE.shortAddress}`
  );

  const whatsappDispatchUrl = `${GYM_PROFILE.whatsappUrl}?text=${whatsappMessage}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="trial-modal-title"
    >
      <div className="w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-white/15 dark:bg-[#13151A]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime-400/20 text-lime-700 dark:text-lime-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h3 id="trial-modal-title" className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
                Free Trial Pass Ready
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {GYM_PROFILE.name} · {GYM_PROFILE.shortAddress}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close confirmation dialog"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-2.5 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-white/10 dark:bg-zinc-900">
          <div className="flex justify-between gap-4">
            <span className="text-zinc-500 dark:text-zinc-400">Member Name</span>
            <span className="font-semibold text-zinc-900 dark:text-white">{request.fullName}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-zinc-500 dark:text-zinc-400">Phone / WhatsApp</span>
            <span className="font-mono text-zinc-900 tabular-nums dark:text-white">{request.phone}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-zinc-500 dark:text-zinc-400">Training Focus</span>
            <span className="font-semibold text-zinc-900 dark:text-white">{request.goal}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-zinc-500 dark:text-zinc-400">Selected Plan</span>
            <span className="font-semibold text-zinc-900 dark:text-white">{request.planName}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-zinc-500 dark:text-zinc-400">Preferred Slot</span>
            <span className="font-semibold text-zinc-900 dark:text-white">{request.preferredTime}</span>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          Tap the button below to send your booking details directly to our front desk WhatsApp ({GYM_PROFILE.phoneDisplay}) for instant floor check-in.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappDispatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-bold text-zinc-950 transition-colors hover:bg-lime-300"
          >
            <MessageCircle className="h-4 w-4 shrink-0" />
            <span>Send Trial Request on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

interface PrivacyModalProps {
  open: boolean;
  onClose: () => void;
}

export function PrivacyModal({ open, onClose }: PrivacyModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-white/15 dark:bg-[#13151A]">
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-lime-600 dark:text-lime-400" />
            <h3 id="privacy-modal-title" className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
              Privacy Policy &amp; Member Data
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close privacy policy"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          <p>
            <strong>{GYM_PROFILE.name}</strong> ({GYM_PROFILE.fullAddress}) respects your privacy. Details entered in our Free Trial Pass form or BMI calculator remain strictly on your device until you choose to dispatch your trial request via WhatsApp.
          </p>
          <p>
            We use your name, phone number, fitness objective, and preferred training slot solely to coordinate your complimentary trial session and membership onboarding. We never sell, rent, or share member phone numbers with third-party marketers.
          </p>
          <p>
            For questions or membership data updates, call or message our front desk directly at{' '}
            <span className="font-mono font-semibold text-zinc-900 dark:text-white">{GYM_PROFILE.phoneDisplay}</span>.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-lime-400 dark:text-zinc-950 dark:hover:bg-lime-300"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
