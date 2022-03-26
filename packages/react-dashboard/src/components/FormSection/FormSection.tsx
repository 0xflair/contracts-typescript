import { useState } from "react";
import { Switch } from "@headlessui/react";
import { classNames } from "../../utils";

export type Props = {
  title: string;
  description: string;
  toggleable?: boolean;
  children: JSX.IntrinsicElements | JSX.Element | string;
};

export const FormSection = (props: Props) => {
  const { title, description, toggleable, children } = props;
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1 flex items-center gap-x-4">
          {toggleable ? (
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={classNames(
                enabled ? "bg-indigo-600" : "bg-gray-200",
                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              )}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={classNames(
                  enabled ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                )}
              />
            </Switch>
          ) : (
            ""
          )}
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div
          className={classNames(
            "mt-5 md:mt-0 md:col-span-2 md:col-start-2",
            enabled || !toggleable ? "" : "hidden"
          )}
        >
          <form action="#" method="POST">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">{children}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
