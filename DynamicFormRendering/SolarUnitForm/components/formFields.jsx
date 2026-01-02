import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import DocumentPicker from '@react-native-documents/picker';

// Get keyboard type based on field type
const getKeyboardType = (type) => {
  if (type === 'EMAIL') return 'email-address';
  if (type === 'MOBILE' || type === 'PINCODE') return 'numeric';
  return 'default';
};

// Reusable field label with mandatory indicator
const FieldLabel = ({ title, isMandatory }) => (
  <Text className="text-sm font-medium text-gray-700 mb-2">
    {title}
    {isMandatory && <Text className="text-red-500"> *</Text>}
  </Text>
);

// Reusable error message display
const ErrorText = ({ error }) =>
  error && <Text className="text-xs text-red-500 mt-1">{error}</Text>;

// Empty list component for SearchDrawerField
const EmptyListComponent = () => (
  <View className="py-4">
    <Text className="text-sm text-gray-500">No results</Text>
  </View>
);

// TEXT FIELD
export const TextField = ({ field, value, error, isMandatory, onChange }) => (
  <View>
    <FieldLabel title={field.title} isMandatory={isMandatory} />
    <TextInput
      className={`border rounded-lg px-4 py-3 text-base bg-white ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
      placeholder={field.placeholder}
      placeholderTextColor="#9CA3AF"
      value={value || ''}
      onChangeText={onChange}
      editable={field.fieldConfig?.isEditable}
      maxLength={field.fieldConfig?.maxLength}
      keyboardType={getKeyboardType(field.type)}
    />
    <ErrorText error={error} />
  </View>
);

// RADIO FIELD
export const RadioField = ({ field, value, error, isMandatory, onChange }) => (
  <View>
    <FieldLabel title={field.title} isMandatory={isMandatory} />
    <View className="flex-row gap-4">
      {field.options?.map(option => (
        <TouchableOpacity
          key={option.value}
          className="flex-row items-center py-2"
          onPress={() => onChange(option.value)}
        >
          {/* Radio circle indicator */}
          <View className="w-5 h-5 rounded-full border-2 border-blue-500 items-center justify-center mr-2">
            {value === option.value && (
              <View className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            )}
          </View>
          <Text className="text-sm text-gray-700">{option.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <ErrorText error={error} />
  </View>
);

// SEARCH DRAWER FIELD
export const SearchDrawerField = ({ field, value, error, isMandatory, onChange }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Normalize options to {name, value} format
  const options = field?.options?.map(opt => {
    if (typeof opt === 'string') return { name: opt, value: opt };
    return {
      name: opt.name ?? opt.label ?? String(opt.value ?? opt.id ?? ''),
      value: opt.value ?? opt.id ?? opt.name ?? opt.label ?? '',
    };
  }) || [];

  // Filter options based on search text
  const filtered = options.filter(
    o =>
      (o.name || '').toLowerCase().includes((searchText || '').toLowerCase()) ||
      (String(o.value) || '').toLowerCase().includes((searchText || '').toLowerCase())
  );

  // Get display text (selected option name or placeholder)
  const displayText = options.find(o => o.value === value)?.name || value || field?.placeholder;

  return (
    <View>
      <FieldLabel title={field?.title} isMandatory={isMandatory} />

      {/* Trigger button to open drawer */}
      <TouchableOpacity
        className={`border rounded-lg px-4 py-3 bg-white ${error ? 'border-red-500' : 'border-gray-300'}`}
        onPress={() => setIsDrawerVisible(true)}
      >
        <Text className={value ? 'text-gray-900' : 'text-gray-400'}>{displayText}</Text>
      </TouchableOpacity>
      <ErrorText error={error} />

      {/* Drawer modal with search and options */}
      <Modal visible={isDrawerVisible} transparent animationType="slide" onRequestClose={() => setIsDrawerVisible(false)}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-2xl p-4 max-h-[70%]">
            <Text className="text-lg font-semibold mb-3">{`Select ${field?.title}`}</Text>

            {/* Search input */}
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search..."
              placeholderTextColor="#9CA3AF"
              className="border rounded-md px-3 py-2 mb-3"
            />

            {/* Options list */}
            <FlatList
              data={filtered}
              keyExtractor={(item, idx) => `${item.value}-${idx}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-3 border-b border-gray-200"
                  onPress={() => {
                    onChange(item.value);
                    setIsDrawerVisible(false);
                    setSearchText('');
                  }}
                >
                  <Text className="text-base text-gray-800">{item.name}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={EmptyListComponent}
            />

            {/* Cancel button */}
            <TouchableOpacity
              className="mt-4 py-3 bg-gray-200 rounded-lg"
              onPress={() => {
                setIsDrawerVisible(false);
                setSearchText('');
              }}
            >
              <Text className="text-center text-gray-700 font-medium">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// --------------------------------------
// FILE UPLOAD FIELD - FIXED
// --------------------------------------
export const FileField = ({ field, value, error, isMandatory, onChange }) => {
  const handleFileUpload = async () => {
    try {
      console.log('Opening file picker...');
      
      // Resolve picker implementation (supports different package exports or missing linkage)
      let picker = DocumentPicker;
      if (!picker || typeof picker.pick !== 'function') {
        try {
          picker = require('@react-native-documents/picker');
        } catch (e1) {
          try {
            picker = require('react-native-document-picker');
          } catch (e2) {
            picker = null;
          }
        }
      }

      if (!picker || typeof picker.pick !== 'function') {
        console.error('DocumentPicker.pick is not available', { DocumentPicker, picker });
        Alert.alert(
          'Document picker unavailable',
          'Document picker is not available on this device. Please ensure the native module is installed and linked, then rebuild the app.'
        );
        return;
      }

      const result = await picker.pick({
        mode: 'open',
        allowMultiSelection: false,
        copyTo: 'cachesDirectory',
      });

      // result may be an array or a single object depending on platform/config
      const file = Array.isArray(result) ? result[0] : result;
      console.log('File selected:', file);
      
      // Consistent with other fields - pass a single file object
      onChange(file);
      
      Alert.alert('Success', `File uploaded: ${file?.name ?? file?.uri ?? 'file'}`);
    } catch (err) {
      const cancelled =
        (DocumentPicker && typeof DocumentPicker.isCancel === 'function' && DocumentPicker.isCancel(err)) ||
        err?.code === 'DOCUMENT_PICKER_CANCELED' ||
        err?.name === 'AbortError' ||
        String(err?.message || '').toLowerCase().includes('cancel');

      if (cancelled) {
        console.log('User cancelled file picker');
        return;
      }
      console.error('File picker error:', err);
      Alert.alert('Error', `Failed to upload file: ${err?.message || 'Unknown error'}`);
    }
  };

  return (
    <View>
      <Text className="text-sm font-medium text-gray-700 mb-2">
        {field.title}
        {isMandatory && <Text className="text-red-500"> *</Text>}
      </Text>

      {field.fieldConfig?.description && (
        <Text className="text-xs text-gray-500 mb-2">
          {field.fieldConfig.description}
        </Text>
      )}

      <TouchableOpacity
        className={`border-2 border-dashed rounded-lg px-4 py-6 items-center ${
          value?.name ? 'border-green-500 bg-green-50' : 'border-blue-300 bg-blue-50'
        }`}
        onPress={handleFileUpload}
      >
        <Text
          className={`text-sm font-medium ${
            value?.name ? 'text-green-600' : 'text-blue-600'
          }`}
        >
          {value?.name ? `✓ ${value.name}` : '📎 Choose File'}
        </Text>
      </TouchableOpacity>

      {field.fieldConfig?.acceptedFormats && (
        <Text className="text-xs text-gray-400 mt-1">
          Accepted: {field.fieldConfig.acceptedFormats.join(', ')} | Max:{' '}
          {field.fieldConfig.maxFileSize}
        </Text>
      )}

      <ErrorText error={error} />
    </View>
  );
};

// DATE FIELD
export const DateField = ({ field, value, error, isMandatory, onChange }) => (
  <View>
    <FieldLabel title={field.title} isMandatory={isMandatory} />
    <TextInput
      className={`border rounded-lg px-4 py-3 text-base bg-white ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
      placeholder="YYYY-MM-DD"
      placeholderTextColor="#9CA3AF"
      value={value || ''}
      onChangeText={onChange}
    />
    <ErrorText error={error} />
  </View>
);

// OTP FIELD - 6 digit OTP input
export const OTPField = ({ field, value, error, isMandatory, onChange }) => (
  <View>
    <FieldLabel title={field.title} isMandatory={isMandatory} />
    <TextInput
      className={`border rounded-lg px-4 py-3 text-base bg-white ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
      placeholder={field.placeholder || 'Enter 6-digit OTP'}
      placeholderTextColor="#9CA3AF"
      value={value || ''}
      onChangeText={onChange}
      keyboardType="numeric"
      maxLength={6}
    />
    <ErrorText error={error} />
  </View>
);

// CHECKBOX FIELD - Simple toggle checkbox
export const CheckboxField = ({ field, value, error, isMandatory, onChange }) => (
  <View>
    <TouchableOpacity
      className="flex-row items-center py-2"
      onPress={() => onChange(!value)}
    >
      {/* Checkbox square */}
      <View className={`w-5 h-5 rounded border-2 items-center justify-center mr-3 ${
        value ? 'bg-blue-500 border-blue-500' : 'border-gray-400 bg-white'
      }`}>
        {value && <Text className="text-white text-xs">✓</Text>}
      </View>
      <Text className="text-sm text-gray-700">{field.placeholder}</Text>
    </TouchableOpacity>
    <ErrorText error={error} />
  </View>
);

// FIELD RENDERER MAP
export const fieldRenderers = {
  TEXT: TextField,
  EMAIL: TextField,
  PINCODE: TextField,
  MOBILE: TextField,
  RADIO: RadioField,
  SEARCH_DRAWER: SearchDrawerField,
  FILE_UPLOAD: FileField,
  DATE: DateField,
  OTP: OTPField,
  CHECKBOX: CheckboxField,
};

// MAIN FORM FIELD WRAPPER - Routes to correct field component
export const FormField = ({ field, value, error, isMandatory, onChange }) => {
  const Renderer = fieldRenderers[field.type];
  if (!Renderer) return null;

  return (
    <Renderer
      field={field}
      value={value}
      error={error}
      isMandatory={isMandatory}
      onChange={onChange}
    />
  );
};