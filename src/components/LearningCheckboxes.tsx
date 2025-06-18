import { Checkbox } from '@/components/ui/checkbox';

interface LearningCheckboxesProps {
  styles: Record<string, boolean>;
  setStyles: (styles: Record<string, boolean>) => void;
}

export default function LearningCheckboxes({ styles, setStyles }: LearningCheckboxesProps) {
  return (
    <>
      {Object.keys(styles).map((type: string, key: number) => (
        <div className='flex items-center gap-2' key={key}>
          <Checkbox id={type} onClick={() => setStyles({ ...styles, [type]: !styles[type] })} />
          <label htmlFor={type} className='text-[13px]'>
            {type}
          </label>
        </div>
      ))}
    </>
  );
}
