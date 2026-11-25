import { useMemo, useState } from 'react';
import { Activity, ArrowRight, CheckCircle2, Info, Scale } from 'lucide-react';

interface BmiCalculatorProps {
  onApplyRecommendedGoal: (goal: string) => void;
}

type UnitSystem = 'metric' | 'imperial';

interface BmiAssessment {
  score: number;
  category: string;
  recommendedGoal: string;
  coachingNote: string;
  toneClass: string;
}

function evaluateBmi(bmi: number): BmiAssessment {
  if (bmi < 18.5) {
    return {
      score: bmi,
      category: 'Underweight Range',
      recommendedGoal: 'Strength & Muscle Gain',
      coachingNote:
        'Focus on compound barbell lifts (squats, presses, rows) 3–4 days per week paired with a steady 300–400 kcal daily surplus.',
      toneClass: 'text-amber-600 dark:text-amber-400',
    };
  }
  if (bmi < 25) {
    return {
      score: bmi,
      category: 'Optimal Athletic Range',
      recommendedGoal: 'General Fitness & Coaching',
      coachingNote:
        'Strong baseline for lean body recomposition. Pair progressive strength splits with two weekly HIIT turf conditioning blocks.',
      toneClass: 'text-lime-700 dark:text-lime-400',
    };
  }
  if (bmi < 30) {
    return {
      score: bmi,
      category: 'Overweight Range',
      recommendedGoal: 'Fat Loss & Conditioning',
      coachingNote:
        'Combine 40 minutes of structured resistance training with 20 minutes of incline treadmill or air bike conditioning to preserve muscle while leaning out.',
      toneClass: 'text-amber-600 dark:text-amber-400',
    };
  }
  return {
    score: bmi,
    category: 'High Body Mass Range',
    recommendedGoal: 'Fat Loss & Conditioning',
    coachingNote:
      'Start with joint-friendly machine strength circuits and low-impact cardio intervals guided by our floor coaches at your own pace.',
    toneClass: 'text-rose-600 dark:text-rose-400',
  };
}

export function BmiCalculator({ onApplyRecommendedGoal }: BmiCalculatorProps) {
  const [unit, setUnit] = useState<UnitSystem>('metric');
  const [heightCm, setHeightCm] = useState<string>('175');
  const [weightKg, setWeightKg] = useState<string>('74');
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('9');
  const [weightLbs, setWeightLbs] = useState<string>('163');

  const assessment = useMemo(() => {
    let bmiVal = 0;
    if (unit === 'metric') {
      const h = parseFloat(heightCm);
      const w = parseFloat(weightKg);
      if (h > 80 && h < 260 && w > 25 && w < 300) {
        const meters = h / 100;
        bmiVal = w / (meters * meters);
      }
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const lbs = parseFloat(weightLbs);
      const totalInches = ft * 12 + inch;
      if (totalInches > 36 && totalInches < 100 && lbs > 55 && lbs < 660) {
        bmiVal = (703 * lbs) / (totalInches * totalInches);
      }
    }
    if (!bmiVal || !Number.isFinite(bmiVal)) return null;
    return evaluateBmi(Number(bmiVal.toFixed(1)));
  }, [unit, heightCm, weightKg, heightFt, heightIn, weightLbs]);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-[#13151A] md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-5 dark:border-white/10">
        <div className="flex items-center gap-3">
          <Scale className="h-5 w-5 text-lime-600 dark:text-lime-400" />
          <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Instant BMI Assessment
          </h3>
        </div>

        <div
          className="inline-flex rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-white/10 dark:bg-zinc-900"
          role="group"
          aria-label="Measurement unit system"
        >
          <button
            type="button"
            onClick={() => setUnit('metric')}
            className={`min-h-[36px] whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              unit === 'metric'
                ? 'bg-white text-zinc-950 shadow-sm dark:bg-lime-400 dark:text-zinc-950'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            Metric (cm / kg)
          </button>
          <button
            type="button"
            onClick={() => setUnit('imperial')}
            className={`min-h-[36px] whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              unit === 'imperial'
                ? 'bg-white text-zinc-950 shadow-sm dark:bg-lime-400 dark:text-zinc-950'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            Imperial (ft / lbs)
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
        <div className="space-y-4 lg:col-span-6">
          {unit === 'metric' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="bmi-height-cm"
                  className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Height (cm)
                </label>
                <input
                  id="bmi-height-cm"
                  type="number"
                  min={90}
                  max={250}
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full min-h-[44px] rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 font-mono text-sm text-zinc-900 tabular-nums focus:border-lime-500 focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                  placeholder="175"
                />
              </div>
              <div>
                <label
                  htmlFor="bmi-weight-kg"
                  className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Weight (kg)
                </label>
                <input
                  id="bmi-weight-kg"
                  type="number"
                  min={30}
                  max={280}
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full min-h-[44px] rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 font-mono text-sm text-zinc-900 tabular-nums focus:border-lime-500 focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                  placeholder="74"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="bmi-height-ft"
                  className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Feet (ft)
                </label>
                <input
                  id="bmi-height-ft"
                  type="number"
                  min={3}
                  max={8}
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  className="w-full min-h-[44px] rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 font-mono text-sm text-zinc-900 tabular-nums focus:border-lime-500 focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                  placeholder="5"
                />
              </div>
              <div>
                <label
                  htmlFor="bmi-height-in"
                  className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Inches (in)
                </label>
                <input
                  id="bmi-height-in"
                  type="number"
                  min={0}
                  max={11}
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  className="w-full min-h-[44px] rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 font-mono text-sm text-zinc-900 tabular-nums focus:border-lime-500 focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                  placeholder="9"
                />
              </div>
              <div>
                <label
                  htmlFor="bmi-weight-lbs"
                  className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Weight (lbs)
                </label>
                <input
                  id="bmi-weight-lbs"
                  type="number"
                  min={65}
                  max={620}
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  className="w-full min-h-[44px] rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 font-mono text-sm text-zinc-900 tabular-nums focus:border-lime-500 focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                  placeholder="163"
                />
              </div>
            </div>
          )}

          <div className="flex items-start gap-2.5 pt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
            <span>
              BMI provides a quick screening reference. During your free trial at Center of Gravity Gym, our coaches factor muscle mass and waist-to-height ratio.
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-zinc-900/70 lg:col-span-6">
          {assessment ? (
            <>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Calculated Score
                  </span>
                  <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${assessment.toneClass}`}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    {assessment.category}
                  </span>
                </div>

                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-mono text-4xl font-semibold tracking-tight text-zinc-900 tabular-nums dark:text-white">
                    {assessment.score}
                  </span>
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    kg/m² · Suggested Track: <strong className="text-zinc-800 dark:text-zinc-200">{assessment.recommendedGoal}</strong>
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {assessment.coachingNote}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => onApplyRecommendedGoal(assessment.recommendedGoal)}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-bold text-zinc-950 transition-colors hover:bg-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
                >
                  <span>Book Free Trial for {assessment.recommendedGoal}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center py-6 text-center text-zinc-500 dark:text-zinc-400">
              <Activity className="mb-2 h-6 w-6" />
              <p className="text-sm">Enter a valid height and weight to calculate your BMI and recommended program.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
