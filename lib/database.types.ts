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
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      bryggeskjema: {
        Row: {
          abv: number | null
          antall_liter_gjaering: number | null
          antall_liter_til_kok: number | null
          batch_navn: string | null
          batch_nr: string | null
          bryggedato: string | null
          bryggenotater: string | null
          created_at: string
          effektivitet: number | null
          finished: boolean
          forv_fg: number | null
          forv_og: number | null
          gjaeringstemp: number | null
          id: string
          karakter: number | null
          koketid: string | null
          malt_fg: number | null
          malt_og: number | null
          mesketemp: number | null
          mesketid: string | null
          meskevann_liter: number | null
          published: boolean
          sjekk_bryggeutstyr: boolean | null
          sjekk_gjaeringskar: boolean | null
          sjekk_gjaernaring: boolean | null
          sjekk_humle: boolean | null
          sjekk_ingredienser: boolean | null
          sjekk_malt_og: boolean | null
          sjekk_meskevann_klargjort: boolean | null
          sjekk_meskevann_temp: boolean | null
          sjekk_mesking_ferdig: boolean | null
          sjekk_oksygenert: boolean | null
          sjekk_rort_i_mesken: boolean | null
          sjekk_skyllevann_klargjort: boolean | null
          sjekk_spiralkjoler: boolean | null
          sjekk_tilsatt_gjaer: boolean | null
          sjekk_tilsatt_malt: boolean | null
          sjekk_torrhumle: boolean | null
          sjekk_vannmengde: boolean | null
          sjekk_vorter_kjolt: boolean | null
          skyllevann_liter: number | null
          smaksnotater: string | null
          tappedato: string | null
          tidspunkt_start: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          abv?: number | null
          antall_liter_gjaering?: number | null
          antall_liter_til_kok?: number | null
          batch_navn?: string | null
          batch_nr?: string | null
          bryggedato?: string | null
          bryggenotater?: string | null
          created_at?: string
          effektivitet?: number | null
          finished?: boolean
          forv_fg?: number | null
          forv_og?: number | null
          gjaeringstemp?: number | null
          id?: string
          karakter?: number | null
          koketid?: string | null
          malt_fg?: number | null
          malt_og?: number | null
          mesketemp?: number | null
          mesketid?: string | null
          meskevann_liter?: number | null
          published?: boolean
          sjekk_bryggeutstyr?: boolean | null
          sjekk_gjaeringskar?: boolean | null
          sjekk_gjaernaring?: boolean | null
          sjekk_humle?: boolean | null
          sjekk_ingredienser?: boolean | null
          sjekk_malt_og?: boolean | null
          sjekk_meskevann_klargjort?: boolean | null
          sjekk_meskevann_temp?: boolean | null
          sjekk_mesking_ferdig?: boolean | null
          sjekk_oksygenert?: boolean | null
          sjekk_rort_i_mesken?: boolean | null
          sjekk_skyllevann_klargjort?: boolean | null
          sjekk_spiralkjoler?: boolean | null
          sjekk_tilsatt_gjaer?: boolean | null
          sjekk_tilsatt_malt?: boolean | null
          sjekk_torrhumle?: boolean | null
          sjekk_vannmengde?: boolean | null
          sjekk_vorter_kjolt?: boolean | null
          skyllevann_liter?: number | null
          smaksnotater?: string | null
          tappedato?: string | null
          tidspunkt_start?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          abv?: number | null
          antall_liter_gjaering?: number | null
          antall_liter_til_kok?: number | null
          batch_navn?: string | null
          batch_nr?: string | null
          bryggedato?: string | null
          bryggenotater?: string | null
          created_at?: string
          effektivitet?: number | null
          finished?: boolean
          forv_fg?: number | null
          forv_og?: number | null
          gjaeringstemp?: number | null
          id?: string
          karakter?: number | null
          koketid?: string | null
          malt_fg?: number | null
          malt_og?: number | null
          mesketemp?: number | null
          mesketid?: string | null
          meskevann_liter?: number | null
          published?: boolean
          sjekk_bryggeutstyr?: boolean | null
          sjekk_gjaeringskar?: boolean | null
          sjekk_gjaernaring?: boolean | null
          sjekk_humle?: boolean | null
          sjekk_ingredienser?: boolean | null
          sjekk_malt_og?: boolean | null
          sjekk_meskevann_klargjort?: boolean | null
          sjekk_meskevann_temp?: boolean | null
          sjekk_mesking_ferdig?: boolean | null
          sjekk_oksygenert?: boolean | null
          sjekk_rort_i_mesken?: boolean | null
          sjekk_skyllevann_klargjort?: boolean | null
          sjekk_spiralkjoler?: boolean | null
          sjekk_tilsatt_gjaer?: boolean | null
          sjekk_tilsatt_malt?: boolean | null
          sjekk_torrhumle?: boolean | null
          sjekk_vannmengde?: boolean | null
          sjekk_vorter_kjolt?: boolean | null
          skyllevann_liter?: number | null
          smaksnotater?: string | null
          tappedato?: string | null
          tidspunkt_start?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          brygg_siden: number | null
          display_name: string | null
          favoritt_gjaer: string | null
          favoritt_humle: string | null
          favoritt_ol_stil: string | null
          hjemmebryggeri: string | null
          id: string
          sted: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          brygg_siden?: number | null
          display_name?: string | null
          favoritt_gjaer?: string | null
          favoritt_humle?: string | null
          favoritt_ol_stil?: string | null
          hjemmebryggeri?: string | null
          id: string
          sted?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          brygg_siden?: number | null
          display_name?: string | null
          favoritt_gjaer?: string | null
          favoritt_humle?: string | null
          favoritt_ol_stil?: string | null
          hjemmebryggeri?: string | null
          id?: string
          sted?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
