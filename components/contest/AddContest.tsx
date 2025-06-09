import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input/Input";
import { createContestSchema } from "@/yup";
import { useAllGames } from "@/app/hooks/useAllGames";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface GameOption {
  value: string;
  label: string;
}

interface ContestFormData {
  contestName: string;
  games: GameOption[] | null;
  league: GameOption | null;
}

const LeagueOptions = [{ label: "NBA", value: "nba" }];

const AddContest: React.FC<IProps> = ({ isModalOpen, setIsModalOpen }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContestFormData>({
    resolver: yupResolver(createContestSchema),
    defaultValues: {
      contestName: "",
      games: null,
      league: null,
    },
  });
  const { games } = useAllGames();
  const [gameList, setGameList] = useState<GameOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ContestFormData) => {
    const gameIds = data.games!.map((game) => game.value);
    const body = {
      gameIds,
      league: data.league!.value,
      name: data.contestName,
    };
    try {
      setIsLoading(false);
      const response = await fetch(`/api/contests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      setIsLoading(false);

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || "Failed to create contest");
      }
      reset({
        games: null,
        contestName: "",
        league: null,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  useEffect(() => {
    if (games && games.data.length > 0) {
      const allGames = games.data.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setGameList(allGames);
    }
  }, [games]);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="max-w-lg"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-bold mb-4 text-orange-500">
          Create New Contest
        </h2>

        <div className="flex flex-col gap-y-1 mb-4">
          <label className="font-medium text-gray-700">
            Contest Name <span className="text-red-500">*</span>
          </label>
          <Controller
            name="contestName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Enter contest name"
                error={!!errors.contestName}
                helperText={errors.contestName?.message}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-y-1 mb-4">
          <label className="font-medium text-gray-700">
            Games <span className="text-red-500">*</span>
          </label>
          <Controller
            name="games"
            control={control}
            render={({ field }) => (
              <div>
                <Select
                  {...field}
                  options={gameList}
                  className="text-sm"
                  placeholder="Select games"
                  onChange={field.onChange}
                  isClearable
                  isMulti
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      borderColor: errors.games
                        ? "#ef4444"
                        : state.isFocused
                        ? "#3b82f6"
                        : "#d1d5db",
                      boxShadow: errors.games
                        ? "0 0 0 1px #ef4444"
                        : state.isFocused
                        ? "0 0 0 1px #3b82f6"
                        : "none",
                      "&:hover": {
                        borderColor: errors.games ? "#ef4444" : "#9ca3af",
                      },
                    }),
                  }}
                />
                {errors.games && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.games.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="flex flex-col gap-y-1 mb-6">
          <label className="font-medium text-gray-700">
            League <span className="text-red-500">*</span>
          </label>
          <Controller
            name="league"
            control={control}
            render={({ field }) => (
              <div>
                <Select
                  {...field}
                  options={LeagueOptions}
                  className="text-sm"
                  placeholder="Select league"
                  onChange={field.onChange}
                  isClearable
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      borderColor: errors.league
                        ? "#ef4444"
                        : state.isFocused
                        ? "#3b82f6"
                        : "#d1d5db",
                      boxShadow: errors.league
                        ? "0 0 0 1px #ef4444"
                        : state.isFocused
                        ? "0 0 0 1px #3b82f6"
                        : "none",
                      "&:hover": {
                        borderColor: errors.league ? "#ef4444" : "#9ca3af",
                      },
                    }),
                  }}
                />
                {errors.league && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.league.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <div className="flex justify-end space-x-2 mt-8">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded cursor-pointer"
          >
            {isLoading && <LoaderCircle className="animate-spin" />}
            {!isLoading && "Confirm"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddContest;
