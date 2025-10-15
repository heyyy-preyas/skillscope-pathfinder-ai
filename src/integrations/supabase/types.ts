export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      career_paths: {
        Row: {
          average_salary_max: number | null
          average_salary_min: number | null
          category: Database["public"]["Enums"]["career_category"]
          created_at: string
          description: string | null
          education_requirements: string[] | null
          growth_outlook: string | null
          id: string
          job_market_data: Json | null
          required_skills: string[] | null
          roadmap: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          average_salary_max?: number | null
          average_salary_min?: number | null
          category: Database["public"]["Enums"]["career_category"]
          created_at?: string
          description?: string | null
          education_requirements?: string[] | null
          growth_outlook?: string | null
          id?: string
          job_market_data?: Json | null
          required_skills?: string[] | null
          roadmap?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          average_salary_max?: number | null
          average_salary_min?: number | null
          category?: Database["public"]["Enums"]["career_category"]
          created_at?: string
          description?: string | null
          education_requirements?: string[] | null
          growth_outlook?: string | null
          id?: string
          job_market_data?: Json | null
          required_skills?: string[] | null
          roadmap?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      mentors: {
        Row: {
          available_slots: Json | null
          bio: string | null
          company: string | null
          created_at: string
          experience_years: number | null
          expertise_areas: string[]
          hourly_rate: number | null
          id: string
          rating: number | null
          total_sessions: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          available_slots?: Json | null
          bio?: string | null
          company?: string | null
          created_at?: string
          experience_years?: number | null
          expertise_areas: string[]
          hourly_rate?: number | null
          id?: string
          rating?: number | null
          total_sessions?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          available_slots?: Json | null
          bio?: string | null
          company?: string | null
          created_at?: string
          experience_years?: number | null
          expertise_areas?: string[]
          hourly_rate?: number | null
          id?: string
          rating?: number | null
          total_sessions?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          current_field: string | null
          education_level: string | null
          full_name: string | null
          goals: string[] | null
          id: string
          location: string | null
          onboarding_completed: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          current_field?: string | null
          education_level?: string | null
          full_name?: string | null
          goals?: string[] | null
          id?: string
          location?: string | null
          onboarding_completed?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          current_field?: string | null
          education_level?: string | null
          full_name?: string | null
          goals?: string[] | null
          id?: string
          location?: string | null
          onboarding_completed?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          category: string | null
          created_at: string
          id: string
          options: Json
          question: string
          quiz_type: Database["public"]["Enums"]["quiz_type"]
          weight: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          options: Json
          question: string
          quiz_type: Database["public"]["Enums"]["quiz_type"]
          weight?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          options?: Json
          question?: string
          quiz_type?: Database["public"]["Enums"]["quiz_type"]
          weight?: number | null
        }
        Relationships: []
      }
      quiz_results: {
        Row: {
          answers: Json
          completed_at: string
          id: string
          quiz_type: Database["public"]["Enums"]["quiz_type"]
          recommendations: string[] | null
          scores: Json | null
          user_id: string
        }
        Insert: {
          answers: Json
          completed_at?: string
          id?: string
          quiz_type: Database["public"]["Enums"]["quiz_type"]
          recommendations?: string[] | null
          scores?: Json | null
          user_id: string
        }
        Update: {
          answers?: Json
          completed_at?: string
          id?: string
          quiz_type?: Database["public"]["Enums"]["quiz_type"]
          recommendations?: string[] | null
          scores?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_career_matches: {
        Row: {
          career_path_id: string
          created_at: string
          id: string
          match_score: number
          reasoning: string | null
          user_id: string
        }
        Insert: {
          career_path_id: string
          created_at?: string
          id?: string
          match_score: number
          reasoning?: string | null
          user_id: string
        }
        Update: {
          career_path_id?: string
          created_at?: string
          id?: string
          match_score?: number
          reasoning?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_career_matches_career_path_id_fkey"
            columns: ["career_path_id"]
            isOneToOne: false
            referencedRelation: "career_paths"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      career_category:
        | "technology"
        | "healthcare"
        | "finance"
        | "education"
        | "arts"
        | "business"
        | "engineering"
        | "science"
        | "other"
      quiz_type: "personality" | "skills" | "interests" | "values"
      skill_level: "beginner" | "intermediate" | "advanced" | "expert"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      career_category: [
        "technology",
        "healthcare",
        "finance",
        "education",
        "arts",
        "business",
        "engineering",
        "science",
        "other",
      ],
      quiz_type: ["personality", "skills", "interests", "values"],
      skill_level: ["beginner", "intermediate", "advanced", "expert"],
    },
  },
} as const
