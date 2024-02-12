export type AnalyticsEventsDay = {
    date_created?: string | null;
    event?: string | null;
    id: number;
};

export type BuilderCtaSection = {
    date_created?: string | null;
    id: number;
    links: any[] & BuilderCtaSectionLinks[];
    sort?: number | null;
    title?: string | null;
};

export type BuilderCtaSectionLinks = {
    builder_cta_section_id?: (number & BuilderCtaSection) | null;
    collection?: string | null;
    id: number;
    item?: (string & any) | null;
    sort?: number | null;
};

export type BuilderSectionBase = {
    content?: unknown | null;
    date_updated?: string | null;
    header_anchor_tag?: string | null;
    id: number;
    section_links: any[] & BuilderSectionBaseSectionLinks[];
    subtitle?: string | null;
    title?: (number & HighlightedTitle) | null;
};

export type BuilderSectionBaseSectionLinks = {
    builder_section_base_id?: (number & BuilderSectionBase) | null;
    collection?: string | null;
    id: number;
    item?: (string & any) | null;
    sort?: number | null;
};

export type BuilderSectionImage = {
    date_updated?: string | null;
    id: number;
    section_content?: unknown | null;
    section_image?: (string & DirectusFiles) | null;
    section_title?: string | null;
    sort?: number | null;
};

export type Contact = {
    contact_links: any[] & SocialLink[];
    id: number;
};

export type DirectusActivity = {
    action: string;
    collection: string;
    comment?: string | null;
    id: number;
    ip?: string | null;
    item: string;
    origin?: string | null;
    revisions: any[] & DirectusRevisions[];
    timestamp: string;
    user?: (string & DirectusUsers) | null;
    user_agent?: string | null;
};

export type DirectusCollections = {
    accountability?: string | null;
    archive_app_filter: boolean;
    archive_field?: string | null;
    archive_value?: string | null;
    collapse: string;
    collection: string;
    color?: string | null;
    display_template?: string | null;
    group?: (string & DirectusCollections) | null;
    hidden: boolean;
    icon?: string | null;
    item_duplication_fields?: unknown | null;
    note?: string | null;
    preview_url?: string | null;
    singleton: boolean;
    sort?: number | null;
    sort_field?: string | null;
    translations?: unknown | null;
    unarchive_value?: string | null;
};

export type DirectusDashboards = {
    color?: string | null;
    date_created?: string | null;
    icon: string;
    id: string;
    name: string;
    note?: string | null;
    panels: any[] & DirectusPanels[];
    user_created?: (string & DirectusUsers) | null;
};

export type DirectusFields = {
    collection: string & DirectusCollections;
    conditions?: unknown | null;
    display?: string | null;
    display_options?: unknown | null;
    field: string;
    group?: (string & DirectusFields) | null;
    hidden: boolean;
    id: number;
    interface?: string | null;
    note?: string | null;
    options?: unknown | null;
    readonly: boolean;
    required?: boolean | null;
    sort?: number | null;
    special?: unknown | null;
    translations?: unknown | null;
    validation?: unknown | null;
    validation_message?: string | null;
    width?: string | null;
};

export type DirectusFiles = {
    charset?: string | null;
    description?: string | null;
    duration?: number | null;
    embed?: string | null;
    filename_disk?: string | null;
    filename_download: string;
    filesize?: number | null;
    folder?: (string & DirectusFolders) | null;
    height?: number | null;
    id: string;
    location?: string | null;
    metadata?: unknown | null;
    modified_by?: (string & DirectusUsers) | null;
    modified_on: string;
    storage: string;
    tags?: unknown | null;
    title?: string | null;
    type?: string | null;
    uploaded_by?: (string & DirectusUsers) | null;
    uploaded_on: string;
    width?: number | null;
};

export type DirectusFlows = {
    accountability?: string | null;
    color?: string | null;
    date_created?: string | null;
    description?: string | null;
    icon?: string | null;
    id: string;
    name: string;
    operation?: (string & DirectusOperations) | null;
    operations: any[] & DirectusOperations[];
    options?: unknown | null;
    status: string;
    trigger?: string | null;
    user_created?: (string & DirectusUsers) | null;
};

export type DirectusFolders = {
    id: string;
    name: string;
    parent?: (string & DirectusFolders) | null;
};

export type DirectusMigrations = {
    name: string;
    timestamp?: string | null;
    version: string;
};

export type DirectusNotifications = {
    collection?: string | null;
    id: number;
    item?: string | null;
    message?: string | null;
    recipient: string & DirectusUsers;
    sender?: (string & DirectusUsers) | null;
    status?: string | null;
    subject: string;
    timestamp?: string | null;
};

export type DirectusOperations = {
    date_created?: string | null;
    flow: string & DirectusFlows;
    id: string;
    key: string;
    name?: string | null;
    options?: unknown | null;
    position_x: number;
    position_y: number;
    reject?: (string & DirectusOperations) | null;
    resolve?: (string & DirectusOperations) | null;
    type: string;
    user_created?: (string & DirectusUsers) | null;
};

export type DirectusPanels = {
    color?: string | null;
    dashboard: string & DirectusDashboards;
    date_created?: string | null;
    height: number;
    icon?: string | null;
    id: string;
    name?: string | null;
    note?: string | null;
    options?: unknown | null;
    position_x: number;
    position_y: number;
    show_header: boolean;
    type: string;
    user_created?: (string & DirectusUsers) | null;
    width: number;
};

export type DirectusPermissions = {
    action: string;
    collection: string;
    fields?: unknown | null;
    id: number;
    permissions?: unknown | null;
    presets?: unknown | null;
    role?: (string & DirectusRoles) | null;
    validation?: unknown | null;
};

export type DirectusPresets = {
    bookmark?: string | null;
    collection?: string | null;
    color?: string | null;
    filter?: unknown | null;
    icon?: string | null;
    id: number;
    layout?: string | null;
    layout_options?: unknown | null;
    layout_query?: unknown | null;
    refresh_interval?: number | null;
    role?: (string & DirectusRoles) | null;
    search?: string | null;
    user?: (string & DirectusUsers) | null;
};

export type DirectusRelations = {
    id: number;
    junction_field?: string | null;
    many_collection: string;
    many_field: string;
    one_allowed_collections?: unknown | null;
    one_collection?: string | null;
    one_collection_field?: string | null;
    one_deselect_action: string;
    one_field?: string | null;
    sort_field?: string | null;
};

export type DirectusRevisions = {
    activity: number & DirectusActivity;
    collection: string;
    data?: unknown | null;
    delta?: unknown | null;
    id: number;
    item: string;
    parent?: (number & DirectusRevisions) | null;
};

export type DirectusRoles = {
    admin_access: boolean;
    app_access: boolean;
    description?: string | null;
    enforce_tfa: boolean;
    icon: string;
    id: string;
    ip_access?: unknown | null;
    name: string;
    users: any[] & DirectusUsers[];
};

export type DirectusSessions = {
    expires: string;
    ip?: string | null;
    origin?: string | null;
    share?: (string & DirectusShares) | null;
    token: string;
    user?: (string & DirectusUsers) | null;
    user_agent?: string | null;
};

export type DirectusSettings = {
    auth_login_attempts?: number | null;
    auth_password_policy?: string | null;
    basemaps?: unknown | null;
    custom_aspect_ratios?: unknown | null;
    custom_css?: string | null;
    default_language: string;
    id: number;
    mapbox_key?: string | null;
    module_bar?: unknown | null;
    project_color?: string | null;
    project_descriptor?: string | null;
    project_logo?: (string & DirectusFiles) | null;
    project_name: string;
    project_url?: string | null;
    public_background?: (string & DirectusFiles) | null;
    public_foreground?: (string & DirectusFiles) | null;
    public_note?: string | null;
    storage_asset_presets?: unknown | null;
    storage_asset_transform?: string | null;
    storage_default_folder?: (string & DirectusFolders) | null;
};

export type DirectusShares = {
    collection?: (string & DirectusCollections) | null;
    date_created?: string | null;
    date_end?: string | null;
    date_start?: string | null;
    id: string;
    item?: string | null;
    max_uses?: number | null;
    name?: string | null;
    password?: string | null;
    role?: (string & DirectusRoles) | null;
    times_used?: number | null;
    user_created?: (string & DirectusUsers) | null;
};

export type DirectusTranslations = {
    id: string;
    key: string;
    language: string;
    value: string;
};

export type DirectusUsers = {
    auth_data?: unknown | null;
    avatar?: (string & DirectusFiles) | null;
    description?: string | null;
    email?: string | null;
    email_notifications?: boolean | null;
    external_identifier?: string | null;
    first_name?: string | null;
    id: string;
    language?: string | null;
    last_access?: string | null;
    last_name?: string | null;
    last_page?: string | null;
    location?: string | null;
    password?: string | null;
    provider: string;
    role?: (string & DirectusRoles) | null;
    status: string;
    tags?: unknown | null;
    tfa_secret?: string | null;
    theme?: string | null;
    title?: string | null;
    token?: string | null;
};

export type DirectusWebhooks = {
    actions: unknown;
    collections: unknown;
    data: boolean;
    headers?: unknown | null;
    id: number;
    method: string;
    name: string;
    status: string;
    url: string;
};

export type ExternalLinkButton = {
    button_external_link?: string | null;
    button_text?: string | null;
    icons: any[] & Icon[];
    id: number;
    sort?: number | null;
    type?: string | null;
};

export type FieldDisplayConditionItem = {
    field_display_condition_id?: (number & FormField) | null;
    id: number;
    name?: string | null;
    value?: string | null;
};

export type FooterSection = {
    footer_section_id?: (number & PageFooter) | null;
    heading?: string | null;
    id: number;
    links: any[] & RouteItem[];
    sort?: number | null;
};

export type FormField = {
    autocomplete_details: string;
    autocomplete_enabled?: boolean | null;
    autocomplete_options: string;
    autocomplete_value?: string | null;
    display_conditions: any[] & FieldDisplayConditionItem[];
    dynamic_option_icon_field?: string | null;
    dynamic_option_label_field?: string | null;
    dynamic_option_value_field?: string | null;
    dynamic_options?: boolean | null;
    dynamic_options_data_field?: string | null;
    dynamic_options_fetch_url?: string | null;
    dynamic_options_settings: string;
    field_icon?: string | null;
    for_select: string;
    form_field_id?: (number & FormGroup) | null;
    form_list_field_id?: (number & Forms) | null;
    id: number;
    label?: string | null;
    name: string;
    note?: string | null;
    placeholder?: string | null;
    real_time_validation?: boolean | null;
    required: boolean;
    sort?: number | null;
    static_options: string;
    static_options_list?: unknown | null;
    type: string;
    validation_checks: any[] & ValidationItem[];
};

export type FormGroup = {
    fields: any[] & FormField[];
    form_group_id?: (number & MultiStepForm) | null;
    form_group_list_id?: (number & Forms) | null;
    group_label?: string | null;
    group_small_text?: string | null;
    id: number;
    sort?: number | null;
};

export type FormSection = {
    form_item?: (number & Forms) | null;
    id: number;
    section_heading?: (number & BuilderSectionBase) | null;
    sort?: number | null;
};

export type Forms = {
    field_list: any[] & FormField[];
    form_name?: string | null;
    group_list: any[] & FormGroup[];
    grouped?: boolean | null;
    grouped_container: string;
    id: number;
    normal_container: string;
    on_submit_error?: unknown | null;
    on_submit_success?: unknown | null;
    post_url?: string | null;
    submit_error_icon?: string | null;
    submit_success_icon?: string | null;
};

export type GenericContentSection = {
    date_updated?: string | null;
    id: number;
    section_heading?: (number & BuilderSectionBase) | null;
    sort?: number | null;
};

export type HighlightedTitle = {
    highlighted_words?: unknown | null;
    id: number;
    title: string;
};

export type HomePage = {
    id: number;
    selected_page?: (number & Page) | null;
};

export type Icon = {
    icon?: string | null;
    icon_id?: (number & InternalLinkButton) | null;
    icon_id_2?: (number & ExternalLinkButton) | null;
    id: number;
    sort?: number | null;
};

export type InternalLinkButton = {
    button_text?: string | null;
    cta_section_link_id?: (number & BuilderCtaSection) | null;
    icons: any[] & Icon[];
    id: number;
    link_id?: number | null;
    route_link?: (number & RouteItem) | null;
    sort?: number | null;
    type?: string | null;
};

export type MetaTag = {
    id: number;
    meta_content?: string | null;
    meta_name?: string | null;
    tag_id?: (number & Page) | null;
};

export type MultiStepForm = {
    form_groups: any[] & FormGroup[];
    form_post_url?: string | null;
    id: number;
};

export type MultiStepFormSection = {
    form_content?: (number & MultiStepForm) | null;
    id: number;
    section_heading?: (number & BuilderSectionBase) | null;
    sort?: number | null;
};

export type Page = {
    date_updated?: string | null;
    guid: string;
    id: number;
    is_dynamic?: boolean | null;
    is_home_page?: boolean | null;
    meta_tags: any[] & MetaTag[];
    meta_title?: string | null;
    og_description?: string | null;
    og_image?: (string & DirectusFiles) | null;
    og_title?: string | null;
    page_id?: (number & RouteItem) | null;
    route_page_id?: (number & RouteItem) | null;
    route_sort?: number | null;
    sections: any[] & PageSections[];
    sort?: number | null;
};

export type PageFooter = {
    copywrite_info?: string | null;
    date_updated?: string | null;
    footer_button?: (number & InternalLinkButton) | null;
    id: number;
    privacy_policy_route?: (number & RouteItem) | null;
    sections: any[] & FooterSection[];
};

export type PageSections = {
    collection?: string | null;
    id: number;
    item?: (string & any) | null;
    page_id?: (number & Page) | null;
};

export type RouteItem = {
    active_page?: (number & Page) | null;
    id: number;
    navbar_appearance: string;
    navbar_label?: string | null;
    parsed_route?: string | null;
    route: any[] & RouteItemPage[];
    route_footer_id?: (number & FooterSection) | null;
    route_id?: (number & Routes) | null;
    show_on_navbar?: boolean | null;
    sort?: number | null;
};

export type RouteItemPage = {
    id: number;
    page_id?: (number & Page) | null;
    route_item_id?: (number & RouteItem) | null;
    sort?: number | null;
};

export type Routes = {
    date_updated?: string | null;
    id: number;
    route_list: any[] & RouteItem[];
};

export type SiteSettings = {
    date_updated?: string | null;
    global_meta_title?: string | null;
    id: number;
    logo?: (string & DirectusFiles) | null;
    site_name?: string | null;
    social_links: any[] & SocialLink[];
};

export type SocialLink = {
    contact_link_id?: (number & Contact) | null;
    contact_social_id?: (number & PageFooter) | null;
    id: number;
    key?: string | null;
    label?: string | null;
    link: string;
    social_link_id?: (number & SiteSettings) | null;
    sort?: number | null;
};

export type ValidationCheck = {
    condition?: string | null;
    id: number;
    sort?: number | null;
    validation_item_check_id?: (number & ValidationItem) | null;
    value?: string | null;
};

export type ValidationItem = {
    checks: any[] & ValidationCheck[];
    description?: string | null;
    form_field_validation_id?: (number & FormField) | null;
    id: number;
    label: string;
    sort?: number | null;
    validation_fail_message: string;
};

export type CustomDirectusTypes = {
    analytics_events_day: AnalyticsEventsDay[];
    builder_cta_section: BuilderCtaSection[];
    builder_cta_section_links: BuilderCtaSectionLinks[];
    builder_section_base: BuilderSectionBase[];
    builder_section_base_section_links: BuilderSectionBaseSectionLinks[];
    builder_section_image: BuilderSectionImage[];
    contact: Contact;
    directus_activity: DirectusActivity[];
    directus_collections: DirectusCollections[];
    directus_dashboards: DirectusDashboards[];
    directus_fields: DirectusFields[];
    directus_files: DirectusFiles[];
    directus_flows: DirectusFlows[];
    directus_folders: DirectusFolders[];
    directus_migrations: DirectusMigrations[];
    directus_notifications: DirectusNotifications[];
    directus_operations: DirectusOperations[];
    directus_panels: DirectusPanels[];
    directus_permissions: DirectusPermissions[];
    directus_presets: DirectusPresets[];
    directus_relations: DirectusRelations[];
    directus_revisions: DirectusRevisions[];
    directus_roles: DirectusRoles[];
    directus_sessions: DirectusSessions[];
    directus_settings: DirectusSettings;
    directus_shares: DirectusShares[];
    directus_translations: DirectusTranslations[];
    directus_users: DirectusUsers[];
    directus_webhooks: DirectusWebhooks[];
    external_link_button: ExternalLinkButton[];
    field_display_condition_item: FieldDisplayConditionItem[];
    footer_section: FooterSection[];
    form_field: FormField[];
    form_group: FormGroup[];
    form_section: FormSection[];
    forms: Forms[];
    generic_content_section: GenericContentSection[];
    highlighted_title: HighlightedTitle[];
    home_page: HomePage;
    icon: Icon[];
    internal_link_button: InternalLinkButton[];
    meta_tag: MetaTag[];
    multi_step_form: MultiStepForm[];
    multi_step_form_section: MultiStepFormSection[];
    page: Page[];
    page_footer: PageFooter;
    page_sections: PageSections[];
    route_item: RouteItem[];
    route_item_page: RouteItemPage[];
    routes: Routes;
    site_settings: SiteSettings;
    social_link: SocialLink[];
    validation_check: ValidationCheck[];
    validation_item: ValidationItem[];
};
