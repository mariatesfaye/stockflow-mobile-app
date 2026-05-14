import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Toast, type ToastVariant } from "@/components/Toast";
import type { FieldErrors } from "@/types";
import { hasErrors, validateUserForm } from "@/utils/validation";

interface RegisterUserScreenProps {
  onRegister: (input: { fullName: string; email: string }) => Promise<void>;
}

export function RegisterUserScreen({ onRegister }: RegisterUserScreenProps) {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant: ToastVariant } | null>(
    null
  );

  const handleSubmit = async () => {
    const validation = validateUserForm({ fullName, email });
    setErrors(validation);

    if (hasErrors(validation)) {
      setToast({ message: "Please fix the errors below", variant: "error" });
      return;
    }

    try {
      setSubmitting(true);
      await onRegister({ fullName, email });
      setToast({ message: "Welcome aboard!", variant: "success" });
    } catch {
      setToast({ message: "Something went wrong. Try again.", variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-ink-100">
      {toast ? (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onHide={() => setToast(null)}
        />
      ) : null}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6 py-8">
            <View className="items-center mb-8">
              <View className="w-16 h-16 rounded-2xl bg-brand-600 items-center justify-center mb-4">
                <Text className="text-white text-3xl">📦</Text>
              </View>
              <Text className="text-3xl font-bold text-ink-900">StockFlow</Text>
              <Text className="text-base text-ink-500 mt-2 text-center max-w-xs">
                Manage your inventory with ease. Let&apos;s get you set up.
              </Text>
            </View>

            <View className="bg-white rounded-2xl p-5 border border-ink-100">
              <Text className="text-lg font-bold text-ink-900 mb-1">
                Create your account
              </Text>
              <Text className="text-sm text-ink-500 mb-5">
                We only need a couple of details to get started.
              </Text>

              <Input
                label="Full name"
                placeholder="full name"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                editable={!submitting}
                error={errors.fullName}
              />

              <Input
                label="Email"
                placeholder="email@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!submitting}
                error={errors.email}
              />

              <View className="mt-2">
                <Button
                  label="Continue"
                  onPress={handleSubmit}
                  loading={submitting}
                />
              </View>
            </View>

            <Text className="text-xs text-ink-500 text-center mt-6">
              By continuing you accept our friendly terms of service.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
