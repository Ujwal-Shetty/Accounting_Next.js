import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { CreateCompanyForm } from "./create-company-form";

export default async function CreateCompanyPage() {
    const session = await auth();
    if (!session?.user) redirect("/signin");

    return <CreateCompanyForm />;
}