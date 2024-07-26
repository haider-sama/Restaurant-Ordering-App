import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
    searchQuery: z.string({
      required_error: "Please name a restaurant!",
    }),
});

export type SearchForm = z.infer<typeof formSchema>;

type SearchProps = {
    onSubmit: (formData: SearchForm) => void;
    placeHolder: string;
    onReset?: () => void;
    searchQuery?: string;
};

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: SearchProps) => {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          searchQuery,
        },
    });

    const handleReset = () => {
        form.reset({searchQuery: "",});
    
        if (onReset) {
            onReset();
        }
    };

    useEffect(() => {
        form.reset({ searchQuery });
    }, [form, searchQuery]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
            className={`flex items-center gap-4 justify-between flex-row border-2 rounded-full p-2 ${
            form.formState.errors.searchQuery && "border-red-400"}`}>
                <Search
                strokeWidth={2.5}
                size={28}
                className="ml-2 text-orange-400 md:block"
                />
                <FormField 
                control={form.control}
                name="searchQuery"
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormControl>
                            <Input {...field}
                            className="border-none shadow-none text-xl focus-visible:ring-0"
                            placeholder={placeHolder}
                            />
                        </FormControl>
                    </FormItem>
                )} />

                <Button 
                onClick={handleReset}
                type="button"
                variant="outline"
                className="rounded-full hidden md:block">
                    Clear
                </Button>

                <Button
                type="submit" 
                className="rounded-full bg-orange-400">
                    Submit
                </Button>
            </form>
        </Form>
    );
}

export default SearchBar;